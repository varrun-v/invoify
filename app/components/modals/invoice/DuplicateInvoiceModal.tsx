"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DuplicateInvoiceModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { getValues, setValue } = useFormContext();
    
    const [newInvoiceNumber, setNewInvoiceNumber] = useState("");
    const [newDueDate, setNewDueDate] = useState<string>("");

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            const currentNum = getValues("details.invoiceNumber");
            setNewInvoiceNumber(currentNum ? currentNum + "-copy" : "INV-COPY");
            
            const currentDueDate = getValues("details.dueDate");
            if (currentDueDate) {
                try {
                    setNewDueDate(new Date(currentDueDate).toISOString().split("T")[0]);
                } catch {
                    setNewDueDate(new Date().toISOString().split("T")[0]);
                }
            } else {
                setNewDueDate(new Date().toISOString().split("T")[0]);
            }
        }
    };

    const handleDuplicate = () => {
        setValue("details.invoiceNumber", newInvoiceNumber);
        
        // Use the exact current Date object for today so it gets formatted correctly by components
        setValue("details.invoiceDate", new Date());
        
        // Parse the HTML date input back into a Date object
        if (newDueDate) {
            // we create it using YYYY/MM/DD local time trick to avoid UTC issues or just new Date
            const [y, m, d] = newDueDate.split("-");
            setValue("details.dueDate", new Date(Number(y), Number(m) - 1, Number(d)));
        }
        
        // Clear updatedAt so it acts like a fresh draft
        setValue("details.updatedAt", "");

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Duplicate Invoice</DialogTitle>
                    <DialogDescription>
                        Create a draft copy of the current invoice with a new invoice number and due date. The issue date will be set to today.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="invoice-number">New Invoice Number</Label>
                        <Input
                            id="invoice-number"
                            value={newInvoiceNumber}
                            onChange={(e) => setNewInvoiceNumber(e.target.value)}
                            placeholder="e.g. INV-002"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="due-date">New Due Date</Label>
                        <Input
                            id="due-date"
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleDuplicate}>Duplicate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
