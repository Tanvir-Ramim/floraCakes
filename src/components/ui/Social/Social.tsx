import {
	FaEnvelope,
	FaFacebookF,
	FaLinkedinIn,
	FaPinterestP,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa6";
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";

interface SocialProps {
	shareUrl: string;
	title?: string;
	media?: string; // For Pinterest image sharing
}

const Social: React.FC<SocialProps> = ({
	shareUrl,
	title = "Check this out!",
	media,
}) => {
	return (
		<div className="flex items-center gap-4 text-lg text-gray-600">
			<FacebookShareButton url={shareUrl} hashtag={title}>
				<FaFacebookF className="cursor-pointer hover:text-blue-600" />
			</FacebookShareButton>

			<TwitterShareButton url={shareUrl} title={title}>
				<FaTwitter className="cursor-pointer hover:text-blue-400" />
			</TwitterShareButton>

			<PinterestShareButton
				url={shareUrl}
				media={media || ""}
				description={title}
			>
				<FaPinterestP className="cursor-pointer hover:text-red-600" />
			</PinterestShareButton>

			<LinkedinShareButton url={shareUrl} title={title}>
				<FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
			</LinkedinShareButton>

			<WhatsappShareButton url={shareUrl} title={title} separator=":: ">
				<FaWhatsapp className="cursor-pointer hover:text-green-500" />
			</WhatsappShareButton>

			<EmailShareButton url={shareUrl} subject={title} body={title}>
				<FaEnvelope className="cursor-pointer hover:text-gray-700" />
			</EmailShareButton>
		</div>
	);
};

export default Social;
