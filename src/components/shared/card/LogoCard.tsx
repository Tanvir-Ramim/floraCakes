interface LogoCardProps {
  item: string;
}
const LogoCard = ({ item }: LogoCardProps) => {
  return (
    <div className="flex justify-center">
      <div
        className="w-52 h-24 bg-cover bg-center cursor-pointer opacity-40 transition-all duration-300 hover:opacity-100"
        style={{
          backgroundImage: `url(${item})`,
        }}
      ></div>
    </div>
  );
};

export default LogoCard;
