import { AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddWhatSendingModal = ({ isModalOpen, handleModalClose }) => {
    const [whatSendingData, setWhatSendingData] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        status: "active",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('hello', formData);
            const response = await axios.post("/api/what-sending", { ...formData, route: "add" });
            if (response.status === 200) {
                setWhatSendingData([...whatSendingData, response.data]);
                toast.success("What Sending item added successfully!");
                handleModalClose(); // Close the modal
                
            } else {
                toast.error("Failed to add What Sending item");
            }
        } catch (error) {
            console.error("Error adding What Sending item:", error);
            toast.error("An error occurred while adding the item");
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
            <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add What Sending</DialogTitle>
                        <DialogDescription>Here you can add a new What Sending item</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
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
                                <Select value={formData.status} onValueChange={handleSelectChange}>
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="deactive">Deactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add What Sending</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddWhatSendingModal
