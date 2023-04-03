import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { Contact } from '../organisms/user/presentationalComponents/Contact/Index';
import { Notification } from '../organisms/user/presentationalComponents/Notification';
import { Footer } from '../organisms/user/presentationalComponents/Footer/Index';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { Work } from '../organisms/user/presentationalComponents/Work/Index';
import { DiscordLogo } from '../atoms/Logo/Discord';
import { TwitterLogo } from '../atoms/Logo/Twitter';
import { GithubLogo } from '../atoms/Logo/Github';
import { Members } from '../organisms/Members';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <Notification />
      <Work />
      <Members />
      <Contact />
      <Footer />
    </>
  );
};
