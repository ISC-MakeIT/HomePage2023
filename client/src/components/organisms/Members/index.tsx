import { css } from '@emotion/react';
import { Member } from 'src/components/molecules/Member';

const members = [
  {
    backgroundColor: '#F15B5B',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
  {
    backgroundColor: '#F15B88',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
  {
    backgroundColor: '#F1915B',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
  {
    backgroundColor: '#C1F15B',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
  {
    backgroundColor: '#70F15B',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
  {
    backgroundColor: '#5BA0F1',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
  {
    backgroundColor: '#F15B5B',
    skill: 'プログラマー',
    name: '八尋　諒',
    icon: '/images/index_top_background.jpg',
    content: {
      discord: 'yappi #3461',
      twitter: 'Yappisec',
      github: 'YahiroRyo',
      description:
        '自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文',
    },
  },
];

export const Members = () => {
  const memberList = members.map((data, index) => {
    return (
      <Member
        key={index}
        name={data.name}
        skill={data.skill}
        icon={data.icon}
        content={data.content}
        background_color={data.backgroundColor}
      />
    );
  });
  return (
    <div
      css={css`
        padding-top: 80px;
      `}
    >
      <h1
        css={css`
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          margin: 100px;
        `}
      >
        メンバー紹介
      </h1>
      <div
        css={css`
          width: 84%;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: flex-start;
        `}
      >
        {memberList}
      </div>
    </div>
  );
};
