interface ProgressStepsProps {
	currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
	return (
		<div className="mb-10">
			<div className="flex items-center justify-center">
				<div className="flex items-center">
					<div
						className={`w-10 h-10 rounded-full flex items-center justify-center ${
							currentStep >= 1
								? "bg-secondary text-white"
								: "bg-gray-200 text-gray-600"
						}`}
					>
						1
					</div>
					<div className="text-sm font-medium ml-2 hidden sm:block">
						Select Card
					</div>
				</div>
				<div
					className={`w-16 h-1 mx-2 ${currentStep >= 2 ? "bg-amber-600" : "bg-gray-200"}`}
				/>
				<div className="flex items-center">
					<div
						className={`w-10 h-10 rounded-full flex items-center justify-center ${
							currentStep >= 2
								? "bg-black text-white"
								: "bg-gray-200 text-gray-600"
						}`}
					>
						2
					</div>
					<div className="text-sm font-medium ml-2 hidden sm:block">
						Recipient Details
					</div>
				</div>
				<div
					className={`w-16 h-1 mx-2 ${currentStep >= 3 ? "bg-amber-600" : "bg-gray-200"}`}
				/>
				<div className="flex items-center">
					<div
						className={`w-10 h-10 rounded-full flex items-center justify-center ${
							currentStep >= 3
								? "bg-black text-white"
								: "bg-gray-200 text-gray-600"
						}`}
					>
						3
					</div>
					<div className="text-sm font-medium ml-2 hidden sm:block">
						Payment
					</div>
				</div>
			</div>
		</div>
	);
}
