import { AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditWhatSendingModal = ({  isModalOpenEdit, handleModalCloseEdit, editData }) => {
    const [whatSendingData, setWhatSendingData] = useState([]);
    console.log('hellow data', editData);
    
    let [formData, setFormData] = useState(editData);
    console.log('hellow data2', formData);

    useEffect(() => {
        setFormData(editData);
      }, [editData]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('hello', formData);
            const response = await axios.post("/api/what-sending", { ...formData, route: "edit" });
            if (response.status === 200) {
                setWhatSendingData([...whatSendingData, response.data]);
                toast.success("What Sending item Edit successfully!");
                handleModalCloseEdit(); // Close the modal
                
            } else {
                toast.error("Failed to Edit What Sending item");
            }
        } catch (error) {
            console.error("Error editing What Sending item:", error);
            toast.error("An error occurred while editing the item");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value) => {
        setFormData({ ...formData, status: value });
    };

    return (
        <div>
            <ToastContainer />
            <Dialog open={isModalOpenEdit} onOpenChange={handleModalCloseEdit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit What Sending</DialogTitle>
                        <DialogDescription>Here you can add a new What Sending item</DialogDescription>
                    </DialogHeader>
                        {formData ? <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 pt-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status ? "active" : "deactive"} onValueChange={handleSelectChange}>
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem  value="active">Active</SelectItem>
                                        <SelectItem value="deactive">Deactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add What Sending</Button>
                        </DialogFooter>
                    </form>  : null }
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditWhatSendingModal
