"use client";

import type React from "react";

import { useState } from "react";

import {
	AlertTriangle,
	Cake,
	CheckCircle,
	Clock,
	ImageIcon,
	MessageSquare,
	Package,
	Plus,
	Search,
	Upload,
	X,
} from "lucide-react";
import Image from "next/image";
import Button from "../ui/button/button";
import { Badge } from "../ui/card/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/card/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/card/tabs";
import Input from "../ui/input/Input";
import SelectDropdown from "../ui/input/SelectDropdown";
import Textarea from "../ui/input/TextArea";

interface Complaint {
	id: string;
	orderId: string;
	type: string;
	subject: string;
	description: string;
	status: "pending" | "in_progress" | "resolved";
	date: string;
	hasPhotos: boolean;
	photos: string[];
	responses: ComplaintResponse[];
}

interface ComplaintResponse {
	from: string;
	message: string;
	date: string;
}

// Sample complaints data
const complaints: Complaint[] = [
	{
		id: "COMP-2023-001",
		orderId: "ORD-2023-1001",
		type: "Cake Quality",
		subject: "Birthday cake was damaged",
		description:
			"The birthday cake I received had damage on one side and the frosting was melted.",
		status: "resolved",
		date: "2023-05-18",
		hasPhotos: true,
		photos: ["cake01.png"],
		responses: [
			{
				from: "Customer Service",
				message:
					"We're sorry about the damaged cake. We'll issue a partial refund of $25.",
				date: "2023-05-19",
			},
			{
				from: "You",
				message: "Thank you for the quick response and resolution.",
				date: "2023-05-19",
			},
		],
	},
	{
		id: "COMP-2023-002",
		orderId: "ORD-2023-0892",
		type: "Delivery",
		subject: "Late delivery",
		description: "My order was delivered 2 hours after the scheduled time.",
		status: "pending",
		date: "2023-04-25",
		hasPhotos: false,
		photos: [],
		responses: [],
	},
	{
		id: "COMP-2023-003",
		orderId: "ORD-2023-0756",
		type: "Cake Quality",
		subject: "Wrong flavor",
		description: "I ordered a vanilla cake but received chocolate instead.",
		status: "in_progress",
		date: "2023-03-12",
		hasPhotos: false,
		photos: [],
		responses: [
			{
				from: "Customer Service",
				message:
					"We apologize for the mix-up. We're looking into what happened with your order.",
				date: "2023-03-13",
			},
		],
	},
];

export default function ComplaintsSection() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
		null,
	);
	const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
	const [newResponse, setNewResponse] = useState("");

	const [newComplaint, setNewComplaint] = useState({
		orderId: "",
		type: "",
		subject: "",
		description: "",
	});

	const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

	const filteredComplaints = complaints.filter((complaint) => {
		// Filter by search term
		const matchesSearch =
			complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			complaint.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
			complaint.description.toLowerCase().includes(searchTerm.toLowerCase());

		// Filter by status tab
		if (activeTab === "all") return matchesSearch;
		if (activeTab === "pending")
			return matchesSearch && complaint.status === "pending";
		if (activeTab === "in_progress")
			return matchesSearch && complaint.status === "in_progress";
		if (activeTab === "resolved")
			return matchesSearch && complaint.status === "resolved";

		return matchesSearch;
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setNewComplaint((prev) => ({ ...prev, [name]: value }));
	};

	// const handleSelectChange = (name: string, value: string) => {
	//   setNewComplaint((prev) => ({ ...prev, [name]: value }));
	// };

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		// In a real app, you would upload these to a server
		// Here we're just creating placeholder URLs
		const newPhotos = Array.from(files).map(
			(_, index) =>
				`/placeholder.svg?height=200&width=300&text=Photo ${index + 1}`,
		);

		setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
	};

	const removePhoto = (index: number) => {
		setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
	};

	const handleSubmitComplaint = () => {
		// Validate form
		if (
			!newComplaint.orderId ||
			!newComplaint.type ||
			!newComplaint.subject ||
			!newComplaint.description
		) {
			//   info("Please fill in all required fields");
			return;
		}

		// In a real app, this would send data to the server
		// success("Complaint submitted successfully!");
		setIsComplaintDialogOpen(false);

		// Reset form
		setNewComplaint({
			orderId: "",
			type: "",
			subject: "",
			description: "",
		});
		setUploadedPhotos([]);
	};

	const handleViewComplaint = (complaint: Complaint) => {
		setSelectedComplaint(complaint);
		setIsViewDialogOpen(true);
	};

	const handleSendResponse = () => {
		if (!newResponse.trim()) {
			//   info("Please enter a message");
			return;
		}

		// In a real app, this would send the response to the server
		// success("Response sent successfully!");
		setNewResponse("");

		// Update the local state to show the new response
		if (selectedComplaint) {
			const updatedComplaint = {
				...selectedComplaint,
				responses: [
					...selectedComplaint.responses,
					{
						from: "You",
						message: newResponse,
						date: new Date().toISOString().split("T")[0],
					},
				],
			};
			setSelectedComplaint(updatedComplaint);
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "pending":
				return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
			case "in_progress":
				return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
			case "resolved":
				return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
			default:
				return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "pending":
				return <Clock className="h-5 w-5 text-amber-500" />;
			case "in_progress":
				return <Package className="h-5 w-5 text-blue-500" />;
			case "resolved":
				return <CheckCircle className="h-5 w-5 text-green-500" />;
			default:
				return <AlertTriangle className="h-5 w-5 text-gray-500" />;
		}
	};

	return (
		<div>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
				<h2 className="text-xl font-semibold">Complaints & Issues</h2>

				<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
					<div className="relative flex-1">
						<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							name="search"
							placeholder="Search complaints..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-8 w-full"
						/>
					</div>

					<Dialog
						open={isComplaintDialogOpen}
						onOpenChange={setIsComplaintDialogOpen}
					>
						<DialogTrigger asChild>
							<Button
								type="button"
								className="flex items-center gap-2 w-52"
								label={
									<>
										{" "}
										<Plus size={16} />
										<span>New Complaint</span>{" "}
									</>
								}
							/>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] bg-white">
							<DialogHeader>
								<DialogTitle className="py-2">Submit a Complaint</DialogTitle>
								<DialogDescription>
									Please provide details about your issue. We will respond as
									soon as possible.
								</DialogDescription>
							</DialogHeader>

							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<Input
										id="orderId"
										label="Order ID"
										name="orderId"
										value={newComplaint.orderId}
										onChange={handleInputChange}
										placeholder="e.g., ORD-2023-1001"
									/>
								</div>

								<div className="space-y-2">
									<SelectDropdown
										label="Complaint Type"
										name="type"
										value={newComplaint.type}
										// onChange={(value) => handleSelectChange("type", value)}
										options={[
											"Cake Quality",
											"Delivery",
											"Customer Service",
											"Billing",
											"Other",
										]}
									/>
								</div>

								<div className="space-y-2">
									<Input
										id="subject"
										name="subject"
										label="Subject"
										value={newComplaint.subject}
										onChange={handleInputChange}
										placeholder="Brief description of the issue"
									/>
								</div>

								<div className="space-y-2">
									<Textarea
										label="description"
										id="description"
										name="description"
										value={newComplaint.description}
										onChange={handleInputChange}
										placeholder="Please provide details about your issue"
										rows={4}
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<label
											htmlFor="photo-upload"
											className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
										>
											<Upload size={16} />
											<span>Upload</span>
										</label>
										<input
											id="photo-upload"
											type="file"
											accept="image/*"
											multiple
											className="hidden"
											onChange={handleFileUpload}
										/>
										<span className="text-sm text-gray-500">
											{uploadedPhotos.length > 0
												? `${uploadedPhotos.length} photo${
														uploadedPhotos.length > 1 ? "s" : ""
													} selected`
												: "No photos selected"}
										</span>
									</div>

									{uploadedPhotos.length > 0 && (
										<div className="flex flex-wrap gap-2 mt-2">
											{uploadedPhotos.map((photo, index) => (
												<div key={index} className="relative">
													<Image
														src={photo || "/placeholder.svg"}
														alt={`Uploaded photo ${index + 1}`}
														width={100}
														height={100}
														className="h-16 w-16 object-cover rounded-md border"
													/>
													<button
														type="button"
														onClick={() => removePhoto(index)}
														className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
													>
														<X size={14} />
													</button>
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							<DialogFooter>
								<Button
									label="Cancel"
									variant="outline"
									onClick={() => setIsComplaintDialogOpen(false)}
								/>
								<Button
									label="Submit Complaint"
									variant="outline"
									onClick={handleSubmitComplaint}
								/>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="mb-4 flex flex-wrap gap-2 ">
					<TabsTrigger value="all">All Complaints</TabsTrigger>
					<TabsTrigger value="pending">Pending</TabsTrigger>
					<TabsTrigger value="in_progress">In Progress</TabsTrigger>
					<TabsTrigger value="resolved">Resolved</TabsTrigger>
				</TabsList>

				<TabsContent value={activeTab} className="space-y-4 mt-20">
					{filteredComplaints.length === 0 ? (
						<Card>
							<CardContent className="text-center py-8">
								<AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
								<p className="text-gray-500">No complaints found</p>
								{activeTab === "all" && (
									<Button
										label="Submit a Complaint"
										variant="outline"
										className="mt-4"
										onClick={() => setIsComplaintDialogOpen(true)}
									/>
								)}
							</CardContent>
						</Card>
					) : (
						filteredComplaints.map((complaint) => (
							<Card key={complaint.id} className="overflow-hidden">
								<CardHeader className="pb-2">
									<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
										<div>
											<CardTitle className="text-base">
												{complaint.subject}
											</CardTitle>
											<CardDescription>
												<div className="flex flex-wrap gap-2 mt-1">
													<span>#{complaint.id}</span>
													<span>•</span>
													<span>Order: {complaint.orderId}</span>
													<span>•</span>
													<span>{complaint.date}</span>
												</div>
											</CardDescription>
										</div>
										{getStatusBadge(complaint.status)}
									</div>
								</CardHeader>

								<CardContent className="pb-2">
									<div className="flex items-start gap-2 mb-2">
										<div className="bg-gray-100 p-1.5 rounded-md">
											{complaint.type === "Cake Quality" ? (
												<Cake className="h-4 w-4 text-gray-600" />
											) : (
												<AlertTriangle className="h-4 w-4 text-gray-600" />
											)}
										</div>
										<span className="text-sm">{complaint.type}</span>
									</div>

									<p className="text-sm text-gray-700 mb-3">
										{complaint.description}
									</p>

									{complaint.hasPhotos && (
										<div className="flex flex-wrap gap-2 mb-3">
											{complaint.photos.map((photo, index) => (
												<Image
													key={index}
													src={photo || "/placeholder.svg"}
													alt={`Evidence photo ${index + 1}`}
													width={100}
													height={100}
													className="h-16 w-16 object-cover rounded-md border"
												/>
											))}
										</div>
									)}

									{complaint.responses.length > 0 && (
										<div className="flex items-center gap-2 text-sm text-gray-500">
											<MessageSquare className="h-4 w-4" />
											<span>
												{complaint.responses.length} response
												{complaint.responses.length > 1 ? "s" : ""}
											</span>
										</div>
									)}
								</CardContent>

								<CardFooter className="pt-0 lg:w-52">
									<Button
										label="View Details"
										className="w-full justify-center"
										onClick={() => handleViewComplaint(complaint as Complaint)}
									>
										View Details
									</Button>
								</CardFooter>
							</Card>
						))
					)}
				</TabsContent>
			</Tabs>

			{/* View Complaint Dialog */}
			{selectedComplaint && (
				<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
					<DialogContent className="sm:max-w-[600px]">
						<DialogHeader>
							<div className="flex items-center justify-between">
								<DialogTitle>{selectedComplaint.subject}</DialogTitle>
								{getStatusBadge(selectedComplaint.status)}
							</div>
							<DialogDescription>
								<div className="flex flex-wrap gap-2 mt-1">
									<span>#{selectedComplaint.id}</span>
									<span>•</span>
									<span>Order: {selectedComplaint.orderId}</span>
									<span>•</span>
									<span>{selectedComplaint.date}</span>
								</div>
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4">
							<div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
								<div className="mt-1">
									{getStatusIcon(selectedComplaint.status)}
								</div>
								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="font-medium">
											Status:{" "}
											{selectedComplaint.status
												.replace("_", " ")
												.charAt(0)
												.toUpperCase() +
												selectedComplaint.status.replace("_", " ").slice(1)}
										</span>
									</div>
									<p className="text-sm text-gray-700">
										{selectedComplaint.description}
									</p>

									{selectedComplaint.hasPhotos && (
										<div className="flex flex-wrap gap-2 mt-3">
											{selectedComplaint.photos.map(
												(photo: string, index: number) => (
													<div key={index} className="relative group">
														<Image
															width={100}
															height={100}
															src={photo || "/placeholder.svg"}
															alt={`Evidence photo ${index + 1}`}
															className="h-20 w-20 object-cover rounded-md border"
														/>
														<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
															<ImageIcon className="h-6 w-6 text-white" />
														</div>
													</div>
												),
											)}
										</div>
									)}
								</div>
							</div>

							<div className="space-y-4">
								<h4 className="text-sm font-medium">Conversation</h4>

								{selectedComplaint.responses.length > 0 ? (
									<div className="space-y-3">
										{selectedComplaint.responses.map(
											(response: ComplaintResponse, index: number) => (
												<div
													key={index}
													className={`flex gap-3 ${
														response.from === "You" ? "justify-end" : ""
													}`}
												>
													<div
														className={`max-w-[80%] p-3 rounded-lg ${
															response.from === "You"
																? "bg-blue-50 text-blue-800"
																: "bg-gray-100 text-gray-800"
														}`}
													>
														<div className="flex justify-between items-center mb-1">
															<span className="font-medium text-sm">
																{response.from}
															</span>
															<span className="text-xs text-gray-500">
																{response.date}
															</span>
														</div>
														<p className="text-sm">{response.message}</p>
													</div>
												</div>
											),
										)}
									</div>
								) : (
									<div className="text-center py-4 text-gray-500 text-sm">
										No responses yet
									</div>
								)}

								{selectedComplaint.status !== "resolved" && (
									<div className="pt-3 border-t">
										<label htmlFor="new-response" className="sr-only">
											Your response
										</label>
										<div className="flex flex-col gap-2">
											<textarea
												id="new-response"
												placeholder="Type your message here..."
												value={newResponse}
												onChange={(e) => setNewResponse(e.target.value)}
												rows={3}
											/>
											<div className="flex justify-end">
												<Button
													label="Send Response"
													onClick={handleSendResponse}
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
