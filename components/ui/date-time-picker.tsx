"use client";

import * as React from "react";
import { format, addMinutes, addYears, isAfter, isBefore, set } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import cn from "classnames";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
}

export function DateTimePicker({
  date,
  onDateChange,
  minDate,
  maxDate,
  placeholder = "Pick a date and time",
  className,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Default min/max if not provided
  const effectiveMinDate = minDate ?? addMinutes(new Date(), 5);
  const effectiveMaxDate = maxDate ?? addYears(new Date(), 1);

  // Handle date selection from calendar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onDateChange(undefined);
      return;
    }

    // Preserve existing time if we have one, otherwise use current time + 1 hour
    const existingTime = date ?? addMinutes(new Date(), 60);
    const newDate = set(selectedDate, {
      hours: existingTime.getHours(),
      minutes: existingTime.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });

    // Ensure the new date is within bounds
    if (isBefore(newDate, effectiveMinDate)) {
      onDateChange(effectiveMinDate);
    } else if (isAfter(newDate, effectiveMaxDate)) {
      onDateChange(effectiveMaxDate);
    } else {
      onDateChange(newDate);
    }
  };

  // Handle time change
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    if (!timeValue) return;

    const [hours, minutes] = timeValue.split(":").map(Number);
    const baseDate = date ?? new Date();

    const newDate = set(baseDate, {
      hours,
      minutes,
      seconds: 0,
      milliseconds: 0,
    });

    // Ensure the new date is within bounds
    if (isBefore(newDate, effectiveMinDate)) {
      onDateChange(effectiveMinDate);
    } else if (isAfter(newDate, effectiveMaxDate)) {
      onDateChange(effectiveMaxDate);
    } else {
      onDateChange(newDate);
    }
  };

  // Format time for input
  const timeValue = date
    ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
    : "";

  // Check if selected date is valid
  const isDateValid =
    date &&
    !isBefore(date, effectiveMinDate) &&
    !isAfter(date, effectiveMaxDate);

  // Get user's timezone as UTC offset
  const getTimezoneOffset = () => {
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMins = Math.abs(offsetMinutes % 60);
    const sign = offsetMinutes <= 0 ? "+" : "-";
    return offsetMins > 0
      ? `UTC${sign}${offsetHours}:${String(offsetMins).padStart(2, "0")}`
      : `UTC${sign}${offsetHours}`;
  };
  const userTimezone = getTimezoneOffset();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-auto py-3",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(calendarDate) =>
              isBefore(calendarDate, effectiveMinDate) ||
              isAfter(calendarDate, effectiveMaxDate)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Time picker - only show after date is selected */}
      {date && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className="w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background text-foreground hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none text-sm font-medium cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Show selected date and time with timezone */}
      {date && isDateValid && (
        <p className="text-xs text-muted-foreground">
          Expires: {format(date, "PPpp")} ({userTimezone})
        </p>
      )}

      {/* Show error if date is invalid */}
      {date && !isDateValid && (
        <p className="text-xs text-destructive">
          Please select a time between 5 minutes and 1 year from now
        </p>
      )}
    </div>
  );
}
