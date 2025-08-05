import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import LoanForm from "@/components/loan-form";


export const LoanModal = ({trigger, session, vehicle}) => {
return (
    <Dialog>
        <DialogTrigger>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogDescription>
                <LoanForm session={session} vehicle = {vehicle}/>
            </DialogDescription>
        </DialogContent>
    </Dialog>
)
}

