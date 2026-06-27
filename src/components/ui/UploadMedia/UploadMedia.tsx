import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UploadMediaProps {
	handleFile: (file: Blob | MediaSource, label: string) => void;
	editingId?: string;
	label: string;
}

export default function UploadMedia({
	handleFile,
	editingId,
	label,
}: UploadMediaProps) {
	const [selectedImages, setSelectedImages] = useState<string[]>([]);

	// Handle Multiple Image Uploads
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			handleFile(files[0], label);
			const newImages = Array.from(files).map((file) =>
				URL.createObjectURL(file),
			);
			setSelectedImages((prevImages) => [...prevImages, ...newImages]);
		}
	};

	// Remove Specific Image
	const removeImage = (index: number) => {
		setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	useEffect(() => {
		if (editingId) {
			setSelectedImages([]);
		}
	}, [editingId]);

	return (
		<div className="">
			<label className="block text-sm text-gray-600 mb-1 capitalize">
				{label || "Picture"}
			</label>
			<div className="border border-dashed border-gray-300 rounded p-4 text-center w-full">
				{/* Upload Button */}
				<label
					htmlFor="upload"
					className="flex flex-col items-center gap-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
				>
					<Camera className="text-gray-400" size={32} />
					<span>Upload media</span>
				</label>
				<input
					type="file"
					id="upload"
					accept="image/*"
					className="hidden"
					multiple
					onChange={handleImageUpload}
				/>

				{/* Uploaded Images Grid */}
				{selectedImages.length > 0 && (
					<div className="flex flex-wrap gap-2 justify-center my-5">
						{selectedImages.map((image, index) => (
							<div key={index} className="relative h-24">
								<Image
									src={image}
									alt="Uploaded preview"
									className="w-full h-full object-cover rounded-md"
									width={100}
									height={100}
								/>
								<button
									type="button"
									className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
									onClick={() => removeImage(index)}
								>
									<X size={14} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
