const getStatusColor = (status: string): string => {
  const statusClasses: Record<string, string> = {
    Delivered: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

export default getStatusColor;
