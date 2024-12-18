import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

const ShareButtons = ({ currentUrl, title }) => {
  
  return (
    <div>
      <FacebookShareButton url={currentUrl} quote={title}>
        Partager sur Facebook
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl} title={title}>
        Partager sur Twitter
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl} title={title}>
        Partager sur LinkedIn
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;