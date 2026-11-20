import { useNavigate } from "@tanstack/react-router";
import { julySample } from "@/lib/sample";
import { useVisaStore } from "@/lib/store";
import { fileToDataUrl, assetUrl } from "@/lib/utils";

/** Loads the July 31 training example as a new packet and opens it. Lives in Settings → Training. */
export function useStartSample() {
  const navigate = useNavigate();
  const createReport = useVisaStore((s) => s.createReport);
  return function startSample() {
    void (async () => {
      try {
        const [stmt, rec] = await Promise.all([
          fetch(assetUrl("samples/statement-jul-2026.pdf"))
            .then((r) => r.blob())
            .then(fileToDataUrl),
          fetch(assetUrl("samples/receipt-jul-2026.pdf"))
            .then((r) => r.blob())
            .then(fileToDataUrl),
        ]);
        const report = createReport(julySample(stmt, rec));
        void navigate({ to: "/reports/$id", params: { id: report.id } });
      } catch {
        const report = createReport(julySample());
        void navigate({ to: "/reports/$id", params: { id: report.id } });
      }
    })();
  };
}
