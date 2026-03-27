"use client";

// ShadCn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Components
import {
  PdfViewer,
  BaseButton,
  NewInvoiceAlert,
  InvoiceLoaderModal,
  InvoiceExportModal,
  DuplicateInvoiceModal,
} from "@/app/components";

// Contexts
import { useFormContext } from "react-hook-form";
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { FileInput, FolderUp, Import, Plus, RotateCcw, Copy } from "lucide-react";

const InvoiceActions = () => {
  const { watch } = useFormContext();
  const { invoicePdfLoading, newInvoice } = useInvoiceContext();
  
  const isInvoiceLoaded = !!watch("sender.name") || !!watch("details.invoiceNumber");

  const { _t } = useTranslationContext();
  return (
    <div className={`xl:w-[45%]`}>
      <Card className="h-auto sticky top-0 px-2">
        <CardHeader>
          <CardTitle>{_t("actions.title")}</CardTitle>
          <CardDescription>{_t("actions.description")}</CardDescription>
        </CardHeader>

        <div className="flex flex-col flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-3">
            {/* Load modal button */}
            <InvoiceLoaderModal>
              <BaseButton
                variant="outline"
                tooltipLabel="Open load invoice menu"
                disabled={invoicePdfLoading}
              >
                <FolderUp />
                {_t("actions.loadInvoice")}
              </BaseButton>
            </InvoiceLoaderModal>

            {/* Export modal button */}
            <InvoiceExportModal>
              <BaseButton
                variant="outline"
                tooltipLabel="Open load invoice menu"
                disabled={invoicePdfLoading}
              >
                <Import />
                {_t("actions.exportInvoice")}
              </BaseButton>
            </InvoiceExportModal>

            {/* Duplicate invoice button */}
            {isInvoiceLoaded && (
              <DuplicateInvoiceModal>
                <BaseButton
                  variant="outline"
                  tooltipLabel="Duplicate this invoice"
                  disabled={invoicePdfLoading}
                >
                  <Copy />
                  Duplicate
                </BaseButton>
              </DuplicateInvoiceModal>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {/* New invoice button */}
            <NewInvoiceAlert>
              <BaseButton
                variant="outline"
                tooltipLabel="Get a new invoice form"
                disabled={invoicePdfLoading}
              >
                <Plus />
                {_t("actions.newInvoice")}
              </BaseButton>
            </NewInvoiceAlert>

            {/* Reset form button */}
            <NewInvoiceAlert
              title="Reset form?"
              description="This will clear all fields and the saved draft."
              confirmLabel="Reset"
              onConfirm={newInvoice}
            >
              <BaseButton
                variant="destructive"
                tooltipLabel="Reset entire form"
                disabled={invoicePdfLoading}
              >
                <RotateCcw />
                Reset Form
              </BaseButton>
            </NewInvoiceAlert>

            {/* Generate pdf button */}
            <BaseButton
              type="submit"
              tooltipLabel="Generate your invoice"
              loading={invoicePdfLoading}
              loadingText="Generating your invoice"
            >
              <FileInput />
              {_t("actions.generatePdf")}
            </BaseButton>
          </div>

          <div className="w-full">
            {/* Live preview and Final pdf */}
            <PdfViewer />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceActions;
