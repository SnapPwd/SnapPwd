import { Textarea } from "@/components/ui/textarea";
import { FaLock } from "react-icons/fa6";

export default function SecretInput() {
  return (
    <div className="flex flex-row">
      <div className="flex items-center min-h-[200px] px-2 bg-gray-300 rounded-l-md border border-slate-400 border-r-transparent">
        <FaLock />
      </div>
      <Textarea
        className="min-h-[200px] rounded-l-none font-mono"
        id="secret"
        name="secret"
        required
        placeholder="SnapPwd allows you to share secrets in a secure, ephemeral way. Input a single or multi-line secret, its expiration time, and click Generate Link. Share the one-time use URL with your intended recipient."
      />
    </div>
  );
}
