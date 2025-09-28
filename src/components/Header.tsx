'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const useDropdown = () => {
  const [open, setOpen] = useState(false);
  return {
    open,
    bind: {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    },
    setOpen,
  };
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Dropdown state for Use cases and Resources
  const useCasesDropdown = useDropdown();
  const resourcesDropdown = useDropdown();

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl">
      <div className="relative flex flex-row md:h-[88px] h-16 items-center px-9 md:px-13 lg:px-16 mx-auto max-w-[1280px]">
        <a
          className="flex flex-row justify-start items-center gap-4 p-4 -m-4 cursor-pointer pr-9 pt-2"
          aria-label="DuNorth logo"
          aria-roledescription="DuNorth logo"
          href="/"
        >
          <svg
            className="w-[76px] h-auto -ml-[6px] scale-x-[1.015]"
            viewBox="0 0 298 79"
            role="img"
            aria-label="DuNorth logo"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" d="M65.5469 23C66.3527 23.0002 67.3278 23.2028 68.0859 23.9609L68.2217 24.1055C68.8684 24.8401 69.0469 25.7439 69.0469 26.5V63.7998C69.0469 66.6695 69.5879 68.2695 70.2422 69.0674C70.9926 69.8356 72.0498 70.2998 73.6465 70.2998C75.3179 70.2997 76.7386 69.8496 77.9795 68.9736C79.2078 68.0443 80.2135 66.8441 80.9912 65.3379L81.1572 65.0059C81.9587 63.4028 82.3905 61.6688 82.4414 59.7803L82.4463 59.4004V31.0996C82.4463 30.5775 82.3993 30.2416 82.3516 30.042C82.3316 29.9588 82.3117 29.9074 82.3008 29.8799C82.226 29.8551 82.0733 29.8142 81.8037 29.7949H81.7959L81.7881 29.7939L81.7656 29.792L81.7441 29.79L81.7236 29.7871L81.7129 29.7852L80.0127 29.5859C79.2837 29.5001 78.4484 29.2931 77.7568 28.7646C76.9621 28.1568 76.5469 27.268 76.5469 26.2998C76.5469 25.3082 76.9522 24.3182 77.8926 23.6748C78.6945 23.1263 79.6468 23 80.4463 23H89.7461C90.5523 23.0001 91.527 23.203 92.2852 23.9609L92.4209 24.1055C93.0678 24.8402 93.2461 25.7439 93.2461 26.5V65.2998C93.2461 65.7873 93.2799 66.1314 93.3203 66.3623C93.3268 66.3992 93.3345 66.4322 93.3408 66.4619C93.4848 66.5143 93.7059 66.5739 94.0293 66.6201L96.1152 66.917C96.7028 66.9743 97.4229 67.139 98.041 67.6143L98.042 67.6152C98.8042 68.2022 99.1465 69.0516 99.1465 69.9004C99.1463 70.9072 98.6513 71.7217 97.9473 72.25C97.328 72.7144 96.5819 72.9403 95.915 73.0654L95.9062 73.0674L95.8789 73.0723L95.8594 73.0762L95.8398 73.0781L95.8115 73.082L95.8027 73.084C93.9381 73.3246 92.5854 73.7854 91.6426 74.373C90.619 75.0573 89.7048 75.8824 88.9004 76.8564L88.9014 76.8574L88.8711 76.8955L88.8311 76.9463L88.7852 76.9902L88.751 77.0234C88.3861 77.3873 87.9852 77.7295 87.5508 77.9902C87.1766 78.2147 86.6815 78.4363 86.1006 78.4883L85.8467 78.5C85.0622 78.5 84.1782 78.2091 83.5713 77.4004C83.0473 76.7014 82.9463 75.8914 82.9463 75.2998V73.25C81.4871 74.5768 80.087 75.6662 78.749 76.4971L78.7783 76.5264L77.5918 77.1631C75.5427 78.2608 73.2779 78.827 70.8369 78.8936L70.3467 78.9004C68.3753 78.9004 66.4805 78.4638 64.6836 77.6045C62.7707 76.6896 61.2292 75.2456 60.0508 73.3604C58.7862 71.3371 58.2461 68.794 58.2461 65.9004V31.0996C58.2461 30.5772 58.1991 30.2409 58.1514 30.041C58.1316 29.9583 58.1115 29.9076 58.1006 29.8799C58.0258 29.8551 57.8731 29.8142 57.6035 29.7949H57.5957L57.5879 29.7939L57.5654 29.792L57.5439 29.79L57.5234 29.7871L57.5127 29.7852L55.8125 29.5859C55.0835 29.5001 54.2483 29.2932 53.5566 28.7646C52.7619 28.1568 52.3467 27.268 52.3467 26.2998C52.3468 25.3081 52.7522 24.3182 53.6924 23.6748C54.4943 23.1263 55.4467 23 56.2461 23H65.5469Z" />
            <path fill="currentColor" fillRule="evenodd" d="M112.457 2C113.587 2.00013 114.683 2.25085 115.646 2.85645L115.825 2.97363C116.701 3.57531 117.339 4.40891 117.777 5.37207L138.757 51.5098V12.5996C138.757 10.5573 138.377 9.7666 138.185 9.55371L138.175 9.54395L138.151 9.51855L138.13 9.49219L138.12 9.48047C137.697 8.98544 137.189 8.69152 136.518 8.57129L134.733 8.27344L134.673 8.26367L134.642 8.25684L134.611 8.25L134.607 8.24902C133.995 8.10764 133.296 7.84604 132.726 7.32031L132.725 7.31934C132.089 6.73282 131.757 5.94578 131.757 5.09961C131.757 4.23136 132.085 3.29545 132.948 2.66211C133.694 2.11548 134.572 2 135.257 2H149.557C150.242 2.00005 151.119 2.11503 151.865 2.66211C152.674 3.25564 153.013 4.11508 153.053 4.93555L153.057 5.09961C153.057 5.87626 152.812 6.75058 152.089 7.41895C151.455 8.00412 150.68 8.21314 150.033 8.2793L148.762 8.47656C147.245 8.70989 146.652 9.14691 146.442 9.41992L146.441 9.41895L146.438 9.4248L146.417 9.45312L146.394 9.48047C146.322 9.56668 146.177 9.81046 146.057 10.3428C145.953 10.7977 145.878 11.417 145.86 12.2363L145.856 12.5996V73.7002C145.856 74.7016 145.721 75.8038 145.216 76.7354L145.278 76.7979L144.827 77.3223C144.808 77.3454 144.789 77.3678 144.77 77.3906L144.675 77.501C143.911 78.3925 142.888 78.8428 141.779 78.8955L141.557 78.9004C139.272 78.9004 137.864 77.1363 137.038 75.334L112.557 22.2129V67.4004C112.557 69.0256 112.816 70.0241 113.131 70.5947C113.389 70.9142 113.964 71.3141 115.261 71.5234L116.528 71.7178C117.178 71.7835 117.954 71.9949 118.589 72.5811C119.312 73.2494 119.557 74.1237 119.557 74.9004C119.557 75.7688 119.228 76.7047 118.365 77.3379C117.713 77.8165 116.959 77.9645 116.322 77.9941L116.057 78H101.757C101.072 78 100.195 77.8845 99.4492 77.3379C98.5859 76.7045 98.257 75.7686 98.2568 74.9004C98.2568 74.1238 98.5014 73.2487 99.2256 72.5801C99.861 71.9939 100.637 71.7822 101.289 71.7168L102.552 71.5234L102.817 71.4785C104.073 71.2456 104.599 70.8433 104.814 70.5537C105.118 70.0786 105.382 69.2762 105.443 67.9912L105.457 67.4004V10.5996C105.457 9.99716 105.405 9.5894 105.342 9.33496C105.321 9.25106 105.3 9.19648 105.287 9.16406C105.243 9.13908 105.159 9.09679 105.022 9.04492C104.701 8.92315 104.212 8.79215 103.515 8.6709L101.214 8.27051L101.21 8.26953L101.183 8.26465L101.142 8.25684L101.115 8.25098L101.107 8.24902C100.495 8.10764 99.7955 7.84604 99.2256 7.32031L99.2246 7.31934C98.5895 6.73282 98.2568 5.94578 98.2568 5.09961C98.257 4.23136 98.5849 3.29545 99.4482 2.66211C100.194 2.11548 101.072 2 101.757 2H112.457ZM111.577 71.8584L111.491 71.7451L111.586 71.8682C111.541 71.8133 111.498 71.7575 111.457 71.7002C111.495 71.754 111.535 71.8069 111.577 71.8584Z" />
            <path fill="currentColor" fillRule="evenodd" d="M171.203 22.4004C175.101 22.4006 178.591 23.7522 181.601 26.3789L182.158 26.8721C184.907 29.3848 187.064 32.6308 188.656 36.5459C190.368 40.7539 191.203 45.4494 191.203 50.5996C191.203 55.498 190.443 60.0087 188.901 64.1094L188.902 64.1104L188.67 64.7168C187.047 68.9501 184.752 72.403 181.739 74.9873L181.684 75.043L181.629 75.0781C178.662 77.5219 175.29 78.8175 171.566 78.8965L171.203 78.9004C167.32 78.9004 163.811 77.5924 160.739 75.0498L160.729 75.043L160.722 75.0361L160.711 75.0273L160.697 75.0166L160.686 75.0059C157.735 72.4244 155.437 68.9727 153.745 64.7422C152.038 60.4743 151.203 55.7504 151.203 50.5996C151.203 45.4494 152.038 40.7539 153.75 36.5459C155.449 32.3702 157.787 28.9546 160.804 26.3789C163.869 23.7627 167.355 22.4004 171.203 22.4004ZM171.203 28.9004C169.878 28.9004 168.792 29.2675 167.862 29.9736C166.907 30.6997 166.007 31.8685 165.234 33.6279C163.767 36.9707 162.913 42.0934 162.812 49.1602L162.803 50.5996C162.803 58.4488 163.669 64.0659 165.235 67.6494C166.008 69.4183 166.909 70.5929 167.865 71.3223C168.795 72.0315 169.88 72.4004 171.203 72.4004C172.526 72.4002 173.61 72.0315 174.54 71.3223C175.496 70.5929 176.397 69.4182 177.17 67.6494C178.736 64.0659 179.603 58.4487 179.603 50.5996C179.603 42.7844 178.736 37.1936 177.171 33.6279C176.399 31.8687 175.499 30.6997 174.543 29.9736C173.671 29.3116 172.663 28.9473 171.448 28.9043L171.203 28.9004ZM167.424 27.8682L167.639 27.75C167.649 27.7447 167.658 27.7386 167.668 27.7334L167.424 27.8682ZM169.344 27.1084L169.642 27.0449C169.645 27.0443 169.647 27.0426 169.65 27.042C169.547 27.0618 169.445 27.0845 169.344 27.1084ZM169.65 27.042C169.655 27.0411 169.66 27.041 169.665 27.04C169.669 27.0393 169.673 27.0388 169.677 27.0381C169.668 27.0397 169.659 27.0403 169.65 27.042ZM180.425 26.6982L180.418 26.6924C180.245 26.5531 180.07 26.4186 179.895 26.2881C180.073 26.4204 180.25 26.557 180.425 26.6982Z" />
            <path fill="currentColor" d="M236.008 8.90137L236.248 8.91309L236.275 8.91504L236.302 8.91699C237.113 9.00066 237.901 9.39375 238.433 10.167L238.525 10.3096C238.964 11.0297 239.059 11.8444 239.059 12.5V23H244.959C245.739 23.0001 246.698 23.1649 247.476 23.8447C248.305 24.5706 248.559 25.5539 248.559 26.4004C248.558 27.2471 248.304 28.2286 247.476 28.9541C246.795 29.5491 245.975 29.7502 245.259 29.791L244.959 29.7998H239.059V66.5C239.059 67.7407 239.255 68.529 239.496 69.0029C239.511 69.0259 239.535 69.0544 239.604 69.0869C239.706 69.1338 239.927 69.2002 240.359 69.2002C240.688 69.2001 240.96 69.1267 241.21 68.9727C241.469 68.8132 241.757 68.534 242.059 68.0469L242.063 68.04L242.068 68.0322L242.069 68.0303L242.081 68.0098L242.095 67.9902C242.74 67.0216 243.307 65.1721 243.566 62.1299V62.1211L243.567 62.1123L243.57 62.084L243.572 62.0664L243.575 62.0498L243.579 62.0215V62.0166C243.677 61.3315 243.92 60.5329 244.519 59.8887C245.174 59.1836 246.032 58.9004 246.859 58.9004C247.697 58.9006 248.647 59.1829 249.321 60.0254C249.926 60.7813 250.059 61.6883 250.059 62.4004V62.458L250.058 62.4775C249.852 67.766 248.751 72.0187 246.381 74.7979L245.679 75.6221L245.658 75.6016C243.683 77.6491 241.306 78.8172 238.56 78.8965L238.259 78.9004C235.413 78.9003 232.948 77.9004 231.016 75.8848L231.008 75.876L230.993 75.8604L230.982 75.8496L230.973 75.8389L230.958 75.8223L230.957 75.8203C229.013 73.6102 228.259 70.3128 228.259 66.4004V29.7998H226.159C225.943 29.7998 225.711 29.7858 225.471 29.7549C225.504 30.0657 225.523 30.3807 225.523 30.7002C225.523 32.3091 225.096 33.8074 224.097 35.0312L224.096 35.0303C223.068 36.3775 221.55 36.9291 219.947 36.9932L219.623 37C218.31 37 216.95 36.7187 215.906 35.8057L215.902 35.8027L215.853 35.7588L215.807 35.7168L215.765 35.6709L215.721 35.6211L215.718 35.6172C215.133 34.9492 214.64 34.2052 214.234 33.3945L214.197 33.3203L214.166 33.2422C213.968 32.7468 213.74 32.3769 213.504 32.1016L213.5 32.0967L213.479 32.0713L213.464 32.0537L213.462 32.0518C213.427 32.0394 213.349 32.0175 213.211 32.0068L213.023 32C212.738 32 212.128 32.1552 211.24 33.376L211.233 33.3867L211.215 33.4121C210.342 34.5574 209.533 36.21 208.844 38.459L208.733 38.873C208.272 40.685 208.001 42.7318 207.938 45.0244L207.923 46.0996V69.2998C207.923 70.3354 208.054 70.8625 208.14 71.082C208.24 71.14 208.503 71.2652 209.078 71.3545L209.538 71.4111L209.542 71.4121H209.544L212.244 71.7119L212.247 71.7129L212.281 71.7168L212.31 71.7197L212.337 71.7246L212.371 71.7305L212.381 71.7314C212.98 71.8406 213.691 72.0901 214.262 72.6611L214.373 72.7793C214.837 73.2971 215.06 73.9139 215.111 74.5205L215.123 74.7998C215.123 75.638 214.84 76.5869 213.998 77.2607C213.337 77.7897 212.56 77.9592 211.898 77.9932L211.623 78H194.723C194.037 77.9999 193.162 77.8843 192.416 77.3379C191.553 76.705 191.223 75.7697 191.223 74.9004C191.223 74.0528 191.558 73.2654 192.192 72.6797C192.762 72.1545 193.46 71.8925 194.073 71.751L194.077 71.75L194.107 71.7432L194.139 71.7363L194.199 71.7266L195.354 71.5332C195.962 71.4172 196.374 71.2881 196.636 71.1719L196.788 71.0967C196.818 71.0799 196.839 71.0655 196.854 71.0557C196.916 70.9547 197.123 70.4991 197.123 69.2998V35.7002C197.123 35.1966 197.08 34.8719 197.033 34.6846C197.026 34.6558 197.016 34.6338 197.011 34.6162L196.994 34.5996L196.948 34.5352C196.946 34.5338 196.942 34.5327 196.939 34.5312C196.862 34.4946 196.683 34.4289 196.34 34.3799L194.248 34.0811C193.631 34.0191 192.884 33.8324 192.257 33.3018C191.51 32.67 191.223 31.8068 191.223 31C191.223 29.9255 191.817 29.1398 192.49 28.6768L192.721 28.5312C193.269 28.2132 193.888 28.0407 194.454 27.9346L194.471 27.9307L194.486 27.9287L194.505 27.9258L195.197 27.8018C196.738 27.4963 197.762 27.083 198.39 26.6514L198.437 26.6201C199.468 25.9529 200.551 25.1208 201.686 24.1133C202.031 23.775 202.409 23.4559 202.819 23.21C203.246 22.9539 203.832 22.7002 204.523 22.7002H204.545L204.566 22.7012L204.771 22.71L204.796 22.7109L204.821 22.7129C205.527 22.7793 206.271 23.0978 206.798 23.8008C207.322 24.4997 207.423 25.3087 207.423 25.9004V27.4453C210.036 24.2371 213.224 22.4004 217.023 22.4004C219.444 22.4006 221.588 23.0961 223.124 24.7363C223.447 24.2489 223.877 23.8546 224.328 23.5508L224.697 23.2881C226.574 21.9361 228.05 20.5363 229.158 19.1006C230.318 17.5321 231.399 15.3184 232.357 12.3809L232.362 12.3672C232.629 11.5662 232.98 10.7843 233.479 10.167C233.999 9.52594 234.826 8.90039 235.959 8.90039H235.983L236.008 8.90137Z" />
            <path fill="currentColor" fillRule="evenodd" d="M24.6006 2C30.2205 2.00012 35.1675 3.6682 39.3447 7.03516L39.7158 7.33203L39.7246 7.33984C43.6732 10.5838 46.6711 15.037 48.7715 20.5928C50.8052 25.9723 51.8629 32.093 51.9873 38.9238L52 40.2998C52 47.7581 50.8719 54.3253 48.5527 59.9521C46.3064 65.5637 43.0693 70.016 38.7959 73.2031C34.6171 76.3194 29.7031 77.8993 24.1406 77.9951L23.6006 78H4.40039C3.71529 78 2.83864 77.8845 2.09277 77.3379C1.28366 76.7443 0.943733 75.8849 0.904297 75.0645L0.900391 74.9004C0.900391 74.054 1.23377 73.2662 1.86914 72.6797C2.43912 72.1539 3.13836 71.8924 3.75098 71.751L3.75879 71.749L3.78516 71.7432L3.82617 71.7354L3.85352 71.7305L3.85742 71.7295L6.15723 71.3291C6.98782 71.1817 7.36428 70.9159 7.54297 70.7109C7.69149 70.5405 7.85332 70.2411 7.8916 69.665L7.90039 69.4004V10.5996C7.90037 9.99708 7.84874 9.58938 7.78516 9.33496C7.76106 9.23863 7.7373 9.18102 7.72461 9.15137L7.72363 9.15039C7.68686 9.12739 7.60831 9.08343 7.4707 9.02734C7.18724 8.91188 6.75472 8.78509 6.1377 8.66699L3.85742 8.27051L3.85352 8.26953L3.82617 8.26465L3.78516 8.25684L3.75879 8.25098L3.75098 8.24902C3.13836 8.10765 2.43911 7.84609 1.86914 7.32031L1.86816 7.31934C1.23307 6.73284 0.900391 5.94579 0.900391 5.09961C0.900524 4.23131 1.22861 3.29541 2.0918 2.66211C2.83766 2.11548 3.71529 2 4.40039 2H24.6006ZM24.6006 8.59961C22.357 8.59961 21.0427 9.14058 20.2852 9.86816L20.2842 9.86719C19.542 10.5805 19 11.798 19 13.9004V66.0996C19 68.5288 19.4914 69.7895 20.0176 70.3838C20.6289 70.9286 21.815 71.4003 24 71.4004C26.6343 71.4003 28.865 70.775 30.7598 69.582C32.6628 68.3837 34.3372 66.5425 35.7412 63.9482L35.75 63.9326C38.645 58.6968 40.2002 50.8917 40.2002 40.2998C40.2002 29.7757 38.7122 21.8725 35.9189 16.4102L35.9072 16.3867C34.6398 13.8231 33.1366 11.9691 31.4424 10.7207L31.1016 10.4795C29.3961 9.32084 27.407 8.68279 25.0723 8.60742L24.6006 8.59961Z" />
            <path fill="currentColor" fillRule="evenodd" d="M262.711 0.00488281C263.575 0.0496858 264.437 0.432773 265.011 1.2666C265.528 2.01941 265.638 2.89918 265.638 3.59961V27.9111C267.768 26.0775 269.765 24.7065 271.62 23.875C273.812 22.8924 276.125 22.4004 278.538 22.4004C282.059 22.4005 285.035 23.586 287.244 26.0547L287.456 26.2979L287.458 26.2998L287.644 26.5205L287.651 26.5303C289.613 28.9259 290.521 32.1755 290.627 36.0225L290.638 36.7998V69.2998C290.638 70.2507 290.749 70.7754 290.835 71.0264C290.888 71.0543 290.964 71.0915 291.069 71.1309C291.329 71.2278 291.728 71.3339 292.313 71.418L294.53 71.7207L294.565 71.7266L294.588 71.7305L294.596 71.7324C295.233 71.8484 295.966 72.1254 296.537 72.748L296.645 72.8711C297.158 73.4956 297.338 74.2325 297.338 74.9004C297.338 75.5743 297.159 76.4047 296.523 77.0684L296.39 77.1992C295.767 77.7698 295.019 77.9547 294.396 77.9922L294.138 78H277.338C276.665 78 275.79 77.877 275.053 77.2979C274.222 76.6452 273.938 75.7178 273.938 74.9004C273.938 74.1881 274.143 73.3976 274.738 72.748L274.848 72.6348C275.401 72.0906 276.084 71.841 276.681 71.7324L276.692 71.7295L276.703 71.7285L276.74 71.7227L276.748 71.7207L278.155 71.5195C278.773 71.4312 279.145 71.3143 279.351 71.2227C279.44 71.1831 279.488 71.1509 279.51 71.1357L279.52 71.123L279.543 71.0938L279.56 71.0713C279.606 71.0098 279.838 70.5743 279.838 69.2998V37.9004C279.838 34.9615 279.312 33.3166 278.68 32.4922L278.552 32.3379C277.861 31.57 276.845 31.0659 275.262 31.0059L274.938 31C273.255 31.0001 271.753 31.4833 270.376 32.4727L270.373 32.4766L270.307 32.5234C269.028 33.4439 267.957 34.6929 267.11 36.3242L266.927 36.6943C266.079 38.389 265.638 40.3114 265.638 42.5V69.2998C265.638 70.3354 265.769 70.8625 265.854 71.082C265.955 71.14 266.218 71.2652 266.793 71.3545L267.253 71.4111L267.257 71.4121H267.259L269.959 71.7119L269.962 71.7129L269.996 71.7168L270.024 71.7197L270.052 71.7246L270.086 71.7305L270.096 71.7314C270.733 71.8474 271.466 72.1254 272.037 72.748L272.145 72.8711C272.658 73.4956 272.838 74.2325 272.838 74.9004C272.838 75.5743 272.659 76.4047 272.023 77.0684L271.89 77.1992C271.267 77.7698 270.519 77.9547 269.896 77.9922L269.638 78H252.138C251.472 78 250.598 77.8508 249.887 77.1992C249.142 76.5168 248.938 75.6204 248.938 74.9004C248.938 74.1881 249.143 73.3976 249.738 72.748L249.848 72.6348C250.401 72.0906 251.084 71.841 251.681 71.7324L251.692 71.7295L251.703 71.7285L251.74 71.7227L251.748 71.7207L253.155 71.5195C253.773 71.4312 254.145 71.3143 254.351 71.2227C254.44 71.1831 254.488 71.1509 254.51 71.1357L254.52 71.123L254.543 71.0938L254.56 71.0713C254.606 71.0098 254.838 70.5743 254.838 69.2998V12C254.838 11.4964 254.795 11.1717 254.748 10.9844C254.741 10.9567 254.732 10.9353 254.727 10.918L254.712 10.9033L254.663 10.8369C254.66 10.8356 254.657 10.8335 254.654 10.832C254.597 10.8047 254.482 10.7606 254.283 10.7197L254.055 10.6807L251.955 10.3799L251.928 10.377L251.882 10.3682L251.862 10.3643C251.269 10.2539 250.596 10.0034 250.048 9.46484L249.938 9.35156C249.343 8.70236 249.138 7.91281 249.138 7.2002C249.138 6.48736 249.344 5.69795 249.938 5.04883L250.046 4.93848C250.588 4.40447 251.253 4.1524 251.841 4.04004L252.471 3.89941C253.961 3.55287 255.186 3.16789 256.162 2.75684C257.364 2.25054 258.334 1.76169 259.09 1.29688C259.674 0.932527 260.237 0.625639 260.769 0.404297C261.279 0.19185 261.894 0 262.538 0L262.711 0.00488281ZM262.841 1.02051C262.84 1.0204 262.839 1.0199 262.837 1.01953C262.835 1.01925 262.832 1.019 262.829 1.01855C262.835 1.01943 262.839 1.02027 262.841 1.02051Z" />
          </svg>
          
          {/* Arrow logo */}
          <svg
            className="w-4 h-4 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <nav className="hidden md:flex items-center space-x-[6px]  lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          {/* Use cases dropdown */}
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative z-10 flex max-w-max flex-1 items-center justify-center"
            {...useCasesDropdown.bind}
          >
            <div style={{ position: "relative" }}>
              <ul
                data-orientation="horizontal"
                className="group flex flex-1 list-none items-center justify-center space-x-2"
                dir="ltr"
              >
                <li className="relative">
                  <button
                    id="use-cases-trigger"
                    aria-expanded={useCasesDropdown.open}
                    aria-controls="use-cases-dropdown"
                    className={`group inline-flex w-max items-center justify-center rounded-4 bg-transparent p-3 px-4 text-sm transition-colors hover:bg-accent data-[state=open]:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-medium leading-none tracking-[-0.32px] grow antialiased select-none text-black font-system`}
                    type="button"
                  >
                    Use cases{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-chevron-down relative top-[1px] ml-2 h-6 w-6 transition duration-200 ${
                        useCasesDropdown.open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  {useCasesDropdown.open && (
                    <motion.div
                      id="use-cases-dropdown"
                      className="absolute left-0 top-full mt-2 min-w-[180px] bg-white shadow-lg rounded-lg py-2 px-2 z-20 border border-gray-100"
                      onMouseEnter={useCasesDropdown.bind.onMouseEnter}
                      onMouseLeave={useCasesDropdown.bind.onMouseLeave}
                      initial={{
                        opacity: 0,
                        y: 0,
                        rotateX: "-90deg",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "top",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: "0deg",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "top",
                      }}
                      exit={{
                        opacity: 0,
                        y: 0,
                        rotateX: "-90deg",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "top",
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0.2, 0.2, 1] }}
                    >
                      <a
                        href="/use-cases/marketing"
                        className="block px-5 py-2 text-sm text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        Marketing
                      </a>
                      <a
                        href="/use-cases/sales"
                        className="block px-5 py-2 text-sm text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        Sales
                      </a>
                      <a
                        href="/use-cases/support"
                        className="block px-5 py-2 text-sm text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        Support
                      </a>
                    </motion.div>
                  )}
                </li>
              </ul>
            </div>
          </nav>
          {/* Resources dropdown */}
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative z-10 flex max-w-max flex-1 items-center justify-center"
            {...resourcesDropdown.bind}
          >
            <div style={{ position: "relative" }}>
              <ul
                data-orientation="horizontal"
                className="group flex flex-1 list-none items-center justify-center space-x-2"
                dir="ltr"
              >
                <li className="relative">
                  <button
                    id="resources-trigger"
                    aria-expanded={resourcesDropdown.open}
                    aria-controls="resources-dropdown"
                    className={`group inline-flex w-max items-center justify-center rounded-4 bg-transparent p-3 px-4 text-sm transition-colors hover:bg-accent data-[state=open]:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-medium leading-none tracking-[-0.32px] grow antialiased select-none text-black font-system`}
                    type="button"
                  >
                    Resources{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-chevron-down relative top-[1px] ml-2 h-6 w-6 transition duration-200 ${
                        resourcesDropdown.open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  {resourcesDropdown.open && (
                    <motion.div
                      id="resources-dropdown"
                      className="absolute left-0 top-full mt-2 min-w-[180px]  bg-white shadow-lg rounded-lg py-2 px-2 z-20 border border-gray-100"
                      onMouseEnter={resourcesDropdown.bind.onMouseEnter}
                      onMouseLeave={resourcesDropdown.bind.onMouseLeave}
                      initial={{
                        opacity: 0,
                        y: 0,
                        rotateX: "-90deg",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "top",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: "0deg",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "top",
                      }}
                      exit={{
                        opacity: 0,
                        y: 0,
                        rotateX: "-90deg",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "top",
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0.2, 0.2, 1] }}
                    >
                      <a
                        href="/resources/blog"
                        className="block px-5 py-2 text-sm text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        Blog
                      </a>
                      <a
                        href="/resources/docs"
                        className="block px-5 py-2 text-sm text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        Documentation
                      </a>
                      <a
                        href="/resources/webinars"
                        className="block px-5 py-2 text-sm text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        Webinars
                      </a>
                    </motion.div>
                  )}
                </li>
              </ul>
            </div>
          </nav>
          <button
            aria-busy="false"
            className="inline-flex items-center relative justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-black hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-4 py-2 h-9.5 rounded-5 gap-3 font-medium leading-none tracking-[-0.32px] grow antialiased select-none font-system"
          >
            <span>Pricing</span>
          </button>
          <button
            aria-busy="false"
            className="inline-flex items-center relative justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-black hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-4 py-2 h-9.5 rounded-5 gap-3 font-medium leading-none tracking-[-0.32px] grow antialiased select-none font-system"
          >
            <span>Careers</span>
          </button>
          <button
            aria-busy="false"
            className="inline-flex items-center relative justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-black hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-4 py-2 h-9.5 rounded-5 gap-3 font-medium leading-none tracking-[-0.32px] grow antialiased select-none font-system"
          >
            <span>Contact sales</span>
          </button>
        </nav>
        <div className="hidden md:flex items-center ml-auto">
          <div className="flex flex-row gap-5">
            <button
              aria-busy="false"
              className="inline-flex items-center relative justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-9.5 rounded-5 gap-3 font-[550] select-none !rounded-full px-6 py-3"
              onClick={() => router.push('/signup')}
            >
              <span className="truncate tracking-wide">Log in</span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center relative justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border h-9.5 rounded-5 gap-3 font-[550] select-none bg-black text-muted hover:bg-black/90 !rounded-full px-6 py-3"
              onClick={() => router.push('/signup')}
            >
              <span className="truncate tracking-wide">Try for free</span>
            </button>
          </div>
        </div>
        <div className="ml-auto md:hidden">
          <button
            aria-busy="false"
            className="inline-flex items-center relative justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 w-11 rounded-4 md:hidden font-[550] select-none"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-_R_iapfiv5a5b_"
            data-state="closed"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu h-7 w-7"
                aria-hidden="true"
              >
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M4 6h16"></path>
              </svg>
              <span className="sr-only">Toggle menu</span>
            </span>
          </button>
        </div>
      </div>
      <div
        className={`${isMenuOpen ? "block" : "hidden"}`}
        data-radix-popper-content-wrapper=""
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: "translate(0px, 45.75px)",
          minWidth: "max-content",
          willChange: "transform",
          zIndex: 50,
          // Custom CSS variables
          ["--radix-popper-transform-origin" as any]: "50% 0px",
          ["--radix-popper-available-width" as any]: "360px",
          ["--radix-popper-available-height" as any]: "694.1999998092651px",
          ["--radix-popper-anchor-width" as any]: "28px",
          ["--radix-popper-anchor-height" as any]: "28px",
        }}
      >
        <div
          data-side="bottom"
          data-align="center"
          data-state="open"
          role="dialog"
          id="radix-_r_er_"
          className="z-50 rounded-6 border border-border-primary text-text-primary bg-popover p-2 shadow-feint outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 md:hidden w-[90vw] mx-[5vw] left-0"
          tabIndex={-1}
          style={{
            ["--radix-popover-content-transform-origin" as any]:
              "var(--radix-popper-transform-origin)",
            ["--radix-popover-content-available-width" as any]:
              "var(--radix-popper-available-width)",
            ["--radix-popover-content-available-height" as any]:
              "var(--radix-popper-available-height)",
            ["--radix-popover-trigger-width" as any]:
              "var(--radix-popper-anchor-width)",
            ["--radix-popover-trigger-height" as any]:
              "var(--radix-popper-anchor-height)",
          }}
        >
          <div className="flex flex-col">
            <button
              aria-busy="false"
              className="inline-flex items-center relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground py-2 h-9.5 rounded-5 gap-3 justify-start px-4 text-sm font-[550] select-none"
            >
              <span className="truncate">Log in</span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground py-2 h-9.5 rounded-5 gap-3 justify-between px-4 text-sm font-[550] select-none"
            >
              <span className="truncate">Use cases</span>
              <span className="ml-auto">
                <span className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right h-7 w-7"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </span>
              </span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground py-2 h-9.5 rounded-5 gap-3 justify-between px-4 text-sm font-[550] select-none"
            >
              <span className="truncate">Resources</span>
              <span className="ml-auto">
                <span className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right h-7 w-7"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </span>
              </span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground py-2 h-9.5 rounded-5 gap-3 justify-start px-4 text-sm font-[550] select-none"
            >
              <span className="truncate">Pricing</span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground py-2 h-9.5 rounded-5 gap-3 justify-start px-4 text-sm font-[550] select-none"
            >
              <span className="truncate">Careers</span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground py-2 h-9.5 rounded-5 gap-3 justify-start px-4 text-sm font-[550] select-none"
            >
              <span className="truncate">Contact sales</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};