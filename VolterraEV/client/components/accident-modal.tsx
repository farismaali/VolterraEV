import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {AlertTriangle, Calendar} from "lucide-react";

interface AccidentModalProps {
    trigger: React.ReactNode;
    accidents: any
}

const AccidentModal = ({ trigger, accidents }: AccidentModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <h3 className="text-lg font-semibold">Accident History</h3>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <div>
                            {accidents.length > 0 ? (
                                <div className="space-y-2">
                                    {accidents.map((accident) => (
                                        <div
                                            key={accident.id}
                                            className="border rounded-lg p-2 hover:border-gray-300 transition-colors"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="w-3 h-3" />
                                                <span className="font-semibold text-sm">
                                                    {new Date(accident.accidentDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="ml-5 text-sm">{accident.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="italic text-sm">No reported accidents.</p>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AccidentModal;
