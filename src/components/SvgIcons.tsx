// 아이콘 props 인터페이스 정의
interface IconProps {
  color?: '#2262C6' | '#ffffff'
}

export const CommonIcon = {
  SearchDate: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2275 7.43359H7.48877V10.2203H10.2275V7.43359Z"
        fill="#666666"
      />
      <path
        d="M14.7979 7.43359H12.0591V10.2203H14.7979V7.43359Z"
        fill="#666666"
      />
      <path
        d="M19.3687 7.43359H16.6299V10.2203H19.3687V7.43359Z"
        fill="#666666"
      />
      <path
        d="M5.65674 15.6562H2.91797V18.4429H5.65674V15.6562Z"
        fill="#666666"
      />
      <path
        d="M10.2275 15.6562H7.48877V18.4429H10.2275V15.6562Z"
        fill="#666666"
      />
      <path
        d="M14.7979 15.6562H12.0591V18.4429H14.7979V15.6562Z"
        fill="#666666"
      />
      <path
        d="M10.2275 11.5488H7.48877V14.3355H10.2275V11.5488Z"
        fill="#666666"
      />
      <path
        d="M5.65674 11.5488H2.91797V14.3355H5.65674V11.5488Z"
        fill="#666666"
      />
      <path
        d="M14.7979 11.5488H12.0591V14.3355H14.7979V11.5488Z"
        fill="#666666"
      />
      <path
        d="M19.3687 11.5488H16.6299V14.3355H19.3687V11.5488Z"
        fill="#666666"
      />
      <path
        d="M16.7379 0.732422H5.63916V1.16278H16.7379V0.732422Z"
        fill="#666666"
      />
      <path
        d="M21.3265 0.732422H19.4229V1.16326H21.3265V5.43492H20.6531V19.9824H1.34694V5.43492H0.673469V1.16326H2.94531V0.732422H0.673469C0.495577 0.734796 0.325626 0.807991 0.199826 0.936411C0.074027 1.06483 0.00232568 1.23832 0 1.41992L0 20.6699C0.00232568 20.8515 0.074027 21.025 0.199826 21.1534C0.325626 21.2819 0.495577 21.355 0.673469 21.3574H21.3265C21.5044 21.355 21.6744 21.2819 21.8002 21.1534C21.926 21.025 21.9977 20.8515 22 20.6699V1.41992C21.9977 1.23832 21.926 1.06483 21.8002 0.936411C21.6744 0.807991 21.5044 0.734796 21.3265 0.732422Z"
        fill="#666666"
      />
      <path
        d="M19.3597 2.10742C19.3052 2.23601 19.2148 2.3454 19.0999 2.42199C18.9849 2.49859 18.8505 2.53902 18.7132 2.53826H17.4471C17.3088 2.53847 17.1734 2.49794 17.0571 2.42151C16.9408 2.34509 16.8486 2.23603 16.7916 2.10742H5.54015C5.47822 2.24203 5.38066 2.35628 5.25848 2.43727C5.1363 2.51826 4.99437 2.56277 4.84872 2.56576H3.72627C3.58477 2.56466 3.44628 2.5239 3.32593 2.44792C3.20558 2.37195 3.10799 2.26367 3.04382 2.13492H1.34668V5.43492H20.6528V2.10742H19.3597Z"
        fill="#666666"
      />
      <path
        d="M5.54004 2.10823H16.7915C16.7527 2.01533 16.7314 1.91583 16.7286 1.8149V1.16406H5.63881V1.74156C5.63367 1.86987 5.59988 1.99528 5.54004 2.10823Z"
        fill="#666666"
      />
      <path
        d="M3.04444 2.10823C2.9805 1.997 2.94643 1.87052 2.94566 1.74156V1.16406H0.673828V5.43573H1.3473V2.10823H3.04444Z"
        fill="#666666"
      />
      <path
        d="M19.3604 2.10823H20.6534V5.43573H21.3269V1.16406H19.4232V1.8149C19.4249 1.91634 19.4034 2.01679 19.3604 2.10823Z"
        fill="#666666"
      />
    </svg>
  ),
  ATTACH_FILE: () => (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.22934 8.85703L10.4691 3.80373C10.4691 3.80373 11.4083 2.68618 12.5452 3.56079C13.5833 4.48398 12.9407 5.45577 12.5452 5.7959C12.1003 6.2332 5.52593 12.3069 5.52593 12.3069C5.52593 12.3069 4.24071 13.5702 2.31288 12.0153C0.681642 10.6548 1.52198 8.95421 2.26345 8.22537C2.95549 7.59371 9.57932 1.56862 9.57932 1.56862C9.57932 1.56862 11.7049 -0.132012 14.1764 1.95733C17.0435 4.62975 14.7696 6.7191 14.7696 6.7191L8.54126 12.647"
        stroke="#4D4D4D"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  BLACK_DROPDOWN: () => (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1.71289L6 6.71289L1 1.71289"
        stroke="#4A4A4A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  BLUE_Exclamation: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 9.15948C7.23206 9.15948 7.45462 9.23009 7.61872 9.35579C7.78281 9.48149 7.875 9.65197 7.875 9.82974C7.875 10.0075 7.78281 10.178 7.61872 10.3037C7.45462 10.4294 7.23206 10.5 7 10.5C6.76794 10.5 6.54538 10.4294 6.38128 10.3037C6.21719 10.178 6.125 10.0075 6.125 9.82974C6.125 9.65197 6.21719 9.48149 6.38128 9.35579C6.54538 9.23009 6.76794 9.15948 7 9.15948ZM7 3.50081C7.21088 3.49341 7.41946 3.53699 7.59624 3.62537C7.6671 3.67737 7.72034 3.74182 7.75138 3.81313C7.78241 3.88444 7.79029 3.96047 7.77434 4.03464L7.5885 8.07401C7.59846 8.1451 7.58529 8.21697 7.55016 8.28321C7.51503 8.34945 7.45903 8.408 7.38717 8.45363C7.26654 8.52293 7.11982 8.56039 6.96903 8.56039C6.81824 8.56039 6.67152 8.52293 6.55089 8.45363C6.47902 8.408 6.42302 8.34945 6.38789 8.28321C6.35276 8.21697 6.33959 8.1451 6.34956 8.07401L6.22566 4.03464C6.21214 3.95755 6.2242 3.87909 6.26075 3.80652C6.29729 3.73395 6.35713 3.6696 6.43473 3.61944C6.60363 3.53782 6.80039 3.49653 7 3.50081Z"
        fill="#2262C6"
      />
      <path
        d="M13.25 7C13.25 10.4518 10.4518 13.25 7 13.25C3.54822 13.25 0.75 10.4518 0.75 7C0.75 3.54822 3.54822 0.75 7 0.75C10.4518 0.75 13.25 3.54822 13.25 7Z"
        stroke="#2262C6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  FallAlarm: ({ size = '156' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 156 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="78" cy="78" r="78" fill="#2AB0FC" />
      <circle cx="78" cy="78" r="64" stroke="white" strokeWidth="2" />
      <g clipPath="url(#clip0_177_13408)">
        <path
          d="M87.7681 84.433H91.6901V88.281C91.6901 96.199 88.4711 103.932 82.0331 106.855L79.2581 102.97C84.9931 100.417 87.7681 94.09 87.7681 88.281V84.433ZM88.8781 84.433H92.7631V88.281C92.7631 93.831 95.5011 99.751 101.236 102.119L98.5721 106.004C92.0601 103.192 88.8781 95.903 88.8781 88.281V84.433ZM80.6271 82.324H99.8301V86.357H80.6271V82.324ZM103.012 79.031H107.97V113.293H103.012V79.031Z"
          fill="white"
        />
        <path
          d="M67.532 79.031H72.453V98.123H67.532V79.031ZM71.084 86.468H77.004V90.501H71.084V86.468ZM57.69 80.992H62.944C62.944 90.094 57.246 96.273 47.034 98.937L45.11 95.052C53.509 92.943 57.69 88.577 57.69 83.434V80.992ZM46.738 80.992H60.65V84.877H46.738V80.992ZM50.216 99.492H72.453V112.923H50.216V99.492ZM67.606 103.377H55.063V109.038H67.606V103.377Z"
          fill="white"
        />
        <path
          d="M87.0282 43.881H91.0612V46.915C91.0612 53.723 88.1012 59.717 81.5892 61.974L78.9622 58.089C84.6972 56.165 87.0282 51.577 87.0282 46.915V43.881ZM88.0272 43.881H92.0232V47.396C92.0232 51.503 94.3172 55.499 99.6822 57.164L97.1292 60.975C90.9502 58.903 88.0272 53.575 88.0272 47.396V43.881ZM101.569 42.031H106.49V62.27H101.569V42.031ZM105.121 49.949H111.041V54.019H105.121V49.949ZM95.3162 63.047C102.42 63.047 106.897 65.526 106.897 69.67C106.897 73.851 102.42 76.293 95.3162 76.293C88.1752 76.293 83.6982 73.851 83.6982 69.67C83.6982 65.526 88.1752 63.047 95.3162 63.047ZM95.3162 66.858C90.9502 66.858 88.5822 67.783 88.5822 69.67C88.5822 71.594 90.9502 72.482 95.3162 72.482C99.6822 72.482 102.013 71.594 102.013 69.67C102.013 67.783 99.6822 66.858 95.3162 66.858Z"
          fill="white"
        />
        <path
          d="M67.532 42.031H72.453V61.789H67.532V42.031ZM71.084 49.949H77.004V54.019H71.084V49.949ZM49.809 63.306H72.453V76.293H67.532V67.228H49.809V63.306ZM46.849 43.955H51.77V58.052H46.849V43.955ZM46.849 56.017H49.735C54.397 56.017 59.466 55.721 64.868 54.685L65.423 58.644C59.836 59.754 54.582 60.05 49.735 60.05H46.849V56.017Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_177_13408">
          <rect
            width="67"
            height="72"
            fill="white"
            transform="translate(45 42)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  SosAlarm: ({ size = '156' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 156 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="78" cy="78" r="78" fill="#FF3819" />
      <circle cx="78" cy="78" r="64" stroke="white" strokeWidth="2" />
      <g clipPath="url(#clip0_177_13598)">
        <path
          d="M111.032 69.6666C110.8 66.5752 109.036 64.7742 106.188 64.7742C103.243 64.7742 101.596 66.6559 101.577 69.2365C101.557 72.0591 103.65 73.3225 106.072 74.0752L108.591 74.9354C113.396 76.4677 116.981 79.8548 117 86.3332C116.981 93.4569 112.989 98.0268 106.149 97.9999C99.3678 98.0268 95.0469 93.6719 94.8726 85.3117H100.53C100.724 89.2365 102.972 91.2257 106.072 91.2257C109.133 91.2257 111.11 89.2365 111.11 86.3332C111.11 83.672 109.366 82.4354 106.304 81.387L103.243 80.3655C98.5152 78.7526 95.6088 75.4731 95.6088 69.7742C95.5895 62.7043 100.085 58 106.227 58C112.447 58 116.535 62.7849 116.612 69.6666H111.032Z"
          fill="white"
        />
        <path
          d="M91.6176 77.9999C91.6176 90.715 85.9404 97.9999 78.5195 97.9999C71.0403 97.9999 65.3826 90.6612 65.3826 77.9999C65.3826 65.2849 71.0403 58 78.5195 58C85.9404 58 91.6176 65.2849 91.6176 77.9999ZM71.3116 77.9999C71.3116 86.3064 74.1599 90.8225 78.5195 90.8494C82.8403 90.8225 85.7079 86.3064 85.6886 77.9999C85.7079 69.6666 82.8403 65.1774 78.5195 65.1505C74.1599 65.1774 71.3116 69.6666 71.3116 77.9999Z"
          fill="white"
        />
        <path
          d="M56.1595 69.6666C55.927 66.5752 54.1638 64.7742 51.3156 64.7742C48.3704 64.7742 46.7235 66.6559 46.7041 69.2365C46.6847 72.0591 48.7773 73.3225 51.1993 74.0752L53.7182 74.9354C58.5234 76.4677 62.108 79.8548 62.1273 86.3332C62.108 93.4569 58.1165 98.0268 51.2768 97.9999C44.4952 98.0268 40.1744 93.6719 40 85.3117H45.6578C45.8515 89.2365 48.0991 91.2257 51.1993 91.2257C54.2607 91.2257 56.237 89.2365 56.237 86.3332C56.237 83.672 54.4932 82.4354 51.4318 81.387L48.3704 80.3655C43.6427 78.7526 40.7363 75.4731 40.7363 69.7742C40.7169 62.7043 45.2121 58 51.3543 58C57.574 58 61.6623 62.7849 61.7398 69.6666H56.1595Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_177_13598">
          <rect
            width="77"
            height="40"
            fill="white"
            transform="translate(40 58)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  SlideArrow: ({ className = '' }) => (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.375 14.6035L1.625 7.85352L8.375 1.10352"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  DropDownArrow: () => (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1.35352L4 4.35352L1 1.35352"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Search: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.81423"
        cy="6.81471"
        r="5.64772"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M10.9272 10.9277L14.5831 14.5836"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  Date: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.37716 4.89258H4.75879V6.53924H6.37716V4.89258Z"
        fill="#666666"
      />
      <path
        d="M9.07735 4.89258H7.45898V6.53924H9.07735V4.89258Z"
        fill="#666666"
      />
      <path
        d="M11.7785 4.89258H10.1602V6.53924H11.7785V4.89258Z"
        fill="#666666"
      />
      <path
        d="M3.67598 9.75146H2.05762V11.3981H3.67598V9.75146Z"
        fill="#666666"
      />
      <path
        d="M6.37716 9.75146H4.75879V11.3981H6.37716V9.75146Z"
        fill="#666666"
      />
      <path
        d="M9.07735 9.75146H7.45898V11.3981H9.07735V9.75146Z"
        fill="#666666"
      />
      <path
        d="M6.37716 7.32471H4.75879V8.97137H6.37716V7.32471Z"
        fill="#666666"
      />
      <path
        d="M3.67598 7.32471H2.05762V8.97137H3.67598V7.32471Z"
        fill="#666666"
      />
      <path
        d="M9.07735 7.32471H7.45898V8.97137H9.07735V7.32471Z"
        fill="#666666"
      />
      <path
        d="M11.7785 7.32471H10.1602V8.97137H11.7785V7.32471Z"
        fill="#666666"
      />
      <path
        d="M10.2234 0.933105H3.66504V1.18741H10.2234V0.933105Z"
        fill="#666666"
      />
      <path
        d="M12.935 0.933105H11.8102V1.18769H12.935V3.71186H12.5371V12.3081H1.12893V3.71186H0.730967V1.18769H2.07342V0.933105H0.730967C0.625849 0.934508 0.525423 0.97776 0.451087 1.05364C0.376751 1.12953 0.334382 1.23205 0.333008 1.33936V12.7144C0.334382 12.8217 0.376751 12.9242 0.451087 13.0001C0.525423 13.0759 0.625849 13.1192 0.730967 13.1206H12.935C13.0402 13.1192 13.1406 13.0759 13.2149 13.0001C13.2893 12.9242 13.3316 12.8217 13.333 12.7144V1.33936C13.3316 1.23205 13.2893 1.12953 13.2149 1.05364C13.1406 0.97776 13.0402 0.934508 12.935 0.933105Z"
        fill="#666666"
      />
      <path
        d="M11.773 1.74561C11.7408 1.82159 11.6874 1.88623 11.6194 1.93149C11.5515 1.97675 11.4721 2.00064 11.3909 2.00019H10.6428C10.5611 2.00032 10.481 1.97636 10.4123 1.9312C10.3436 1.88604 10.2891 1.8216 10.2554 1.74561H3.60687C3.57027 1.82515 3.51262 1.89266 3.44042 1.94052C3.36823 1.98838 3.28436 2.01467 3.19829 2.01644H2.53503C2.45141 2.01579 2.36958 1.99171 2.29846 1.94681C2.22735 1.90192 2.16968 1.83793 2.13176 1.76186H1.12891V3.71186H12.5371V1.74561H11.773Z"
        fill="#666666"
      />
      <path
        d="M3.60645 1.74542H10.255C10.2321 1.69052 10.2195 1.63172 10.2179 1.57208V1.1875H3.66481V1.52875C3.66177 1.60457 3.64181 1.67867 3.60645 1.74542Z"
        fill="#666666"
      />
      <path
        d="M2.13226 1.74542C2.09448 1.67969 2.07435 1.60496 2.07389 1.52875V1.1875H0.731445V3.71167H1.1294V1.74542H2.13226Z"
        fill="#666666"
      />
      <path
        d="M11.7734 1.74542H12.5375V3.71167H12.9355V1.1875H11.8106V1.57208C11.8116 1.63203 11.7989 1.69138 11.7734 1.74542Z"
        fill="#666666"
      />
    </svg>
  ),
}

// NavIcon 객체와 이 객체의 메서드로 아이콘 컴포넌트들을 정의
export const NavIcon = {
  Home: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.7 3.72168C0.7 2.05628 2.05634 0.7 3.72214 0.7C5.38737 0.7 6.74378 2.05621 6.74378 3.72168C6.74378 5.38722 5.38731 6.74364 3.72214 6.74364C2.05641 6.74364 0.7 5.38716 0.7 3.72168ZM1.33047 3.72168C1.33047 5.04098 2.40217 6.11362 3.72214 6.11362C5.04145 6.11362 6.11378 5.04111 6.11378 3.72168C6.11378 2.40213 5.04131 1.33002 3.72214 1.33002C2.40231 1.33002 1.33047 2.40226 1.33047 3.72168Z"
        fill={color}
        stroke={color}
        strokeWidth="1.4"
      />
      <path
        d="M14.2788 10.5564C12.2265 10.5564 10.5566 12.226 10.5566 14.2784C10.5566 16.3302 12.2265 18 14.2788 18C16.3306 18 18.0004 16.3302 18.0004 14.2784C18.0004 12.226 16.3306 10.5564 14.2788 10.5564ZM14.2788 15.97C13.3456 15.97 12.5866 15.211 12.5866 14.2784C12.5866 13.3452 13.3456 12.5864 14.2788 12.5864C15.2114 12.5864 15.9704 13.3452 15.9704 14.2784C15.9704 15.211 15.2114 15.97 14.2788 15.97Z"
        fill={color}
      />
      <path
        d="M3.72214 10.5564C1.66982 10.5564 0 12.226 0 14.2781C0 16.3302 1.66982 18 3.72214 18C5.77395 18 7.44378 16.3302 7.44378 14.2781C7.44378 12.226 5.77395 10.5564 3.72214 10.5564Z"
        fill={color}
      />
      <path
        d="M14.2783 7.44364C16.3301 7.44364 17.9999 5.77402 17.9999 3.72168C17.9999 1.66959 16.3301 0 14.2783 0C12.226 0 10.5566 1.66959 10.5566 3.72168C10.5566 5.77402 12.226 7.44364 14.2783 7.44364Z"
        fill={color}
      />
    </svg>
  ),
  CrewInfo: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4344 17.5V8.51815C17.4344 7.92915 17.1298 7.38936 16.6421 7.09513C16.1554 6.80186 15.555 6.79338 15.061 7.0727L15.0609 7.07273C13.3533 8.03787 11.2012 8.55965 9.00006 8.55965C6.79894 8.55965 4.64681 8.03787 2.93922 7.07273L2.93916 7.0727C2.44502 6.79332 1.84474 6.8017 1.35826 7.09503L17.4344 17.5ZM17.4344 17.5H14.2299V11.7029V11.0371L13.5906 11.2227C12.1488 11.6411 10.6008 11.8582 9.00006 11.8582C7.39936 11.8582 5.85134 11.6411 4.40955 11.2227L3.7702 11.0371V11.7029V17.5M17.4344 17.5H3.7702M3.7702 17.5H0.565796V8.51815C0.565796 7.9291 0.870437 7.38926 1.35823 7.09505L3.7702 17.5Z"
        fill={color}
        stroke={color}
      />
      <path
        d="M4.75551 2.68664C4.75551 3.90451 3.79252 4.87301 2.62768 4.87301C1.463 4.87301 0.5 3.90453 0.5 2.68664C0.5 1.46845 1.46303 0.5 2.62768 0.5C3.79249 0.5 4.75551 1.46847 4.75551 2.68664Z"
        fill={color}
        stroke={color}
      />
      <path
        d="M17.5 2.68664C17.5 3.90453 16.537 4.87301 15.3723 4.87301C14.2075 4.87301 13.2445 3.90452 13.2445 2.68664C13.2445 1.46847 14.2075 0.5 15.3723 0.5C16.537 0.5 17.5 1.46845 17.5 2.68664Z"
        fill={color}
        stroke={color}
      />
    </svg>
  ),
  GroupInfo: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0257 0H8.99597C8.73776 0 8.48999 0.102692 8.30741 0.285242L0.285175 8.30732C-0.0950583 8.68783 -0.0950583 9.30447 0.285175 9.68499L8.31486 17.7148C8.50535 17.9049 8.7544 18 9.00392 18C9.25297 18 9.5025 17.9049 9.69249 17.7148L17.7147 9.69268C17.8973 9.50985 18 9.26218 18 9.00383V0.974089C18 0.436067 17.5639 0 17.0257 0ZM16.0518 8.60041L9.00392 15.6484L2.35164 8.99616L9.39955 1.94815H16.0518V8.60041Z"
        fill={color}
      />
      <path
        d="M12.909 6.30909C13.5812 6.30909 14.1264 5.76414 14.1264 5.09155C14.1264 4.41911 13.5812 3.87402 12.909 3.87402C12.2364 3.87402 11.6914 4.41911 11.6914 5.09155C11.6914 5.76414 12.2364 6.30909 12.909 6.30909Z"
        fill={color}
      />
    </svg>
  ),
  Monitoring: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8232 11.7658L17.4054 12.0405C17.5107 12.2006 17.5295 12.404 17.4547 12.5817C16.23 15.4818 12.8587 17.5 8.99993 17.5C5.14122 17.5 1.76989 15.4817 0.545282 12.5815C0.47055 12.4041 0.489235 12.201 0.594579 12.0407C0.699768 11.8808 0.876825 11.7858 1.06517 11.7858H7.93481H8.43481V11.2858V10.1428V9.64285H7.93481H2.32476C2.15704 9.64285 1.9975 9.56766 1.88968 9.4364C1.78186 9.30507 1.73747 9.13154 1.76955 8.96342C1.79717 8.82015 2.5497 5.03896 5.47679 2.09512L5.4768 2.0951C5.69728 1.87334 6.05354 1.87334 6.27402 2.0951C6.49609 2.31847 6.49609 2.68181 6.27402 2.90518L6.27401 2.90518C4.6066 4.58232 3.70919 6.56632 3.26587 7.83505L3.03352 8.49998H3.73788H7.93481H8.43481V7.99999V1.07169C8.43481 0.898654 8.51244 0.735449 8.64501 0.627107C8.7781 0.518546 8.95078 0.477087 9.11455 0.512225L9.11626 0.512585C9.28337 0.547827 14.849 1.77941 17.2056 8.88993C17.2636 9.06494 17.2342 9.25744 17.1274 9.40638L17.1271 9.40676C17.0205 9.55575 16.8502 9.64285 16.6698 9.64285H10.0653H9.56528V10.1428V11.2858V11.7858H10.0653H16.9347C17.1231 11.7858 17.3001 11.8807 17.4057 12.0409L17.8232 11.7658ZM17.8232 11.7658C18.0203 12.0657 18.0548 12.4449 17.9154 12.776M17.8232 11.7658C17.6257 11.4661 17.2923 11.2858 16.9347 11.2858L17.9154 12.776M17.9154 12.776C16.5961 15.9005 13.0135 18 8.99993 18C4.98654 18 1.40401 15.9005 0.0846618 12.776C-0.0549869 12.4449 -0.0202652 12.0657 0.176914 11.7658C0.374119 11.4661 0.707747 11.2858 1.06517 11.2858L17.9154 12.776ZM10.2819 2.14893L9.56528 1.80445V2.59957V7.99999V8.49998H10.0653H15.11H15.8849L15.5656 7.79398C14.0494 4.44076 11.752 2.85559 10.2819 2.14893Z"
        fill={color}
        stroke={color}
      />
    </svg>
  ),
  Sos: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5_8726)">
        <path
          d="M15.0134 2.98677L15.0134 2.98677C18.3289 6.30221 18.3289 11.6978 15.0134 15.0132L15.0134 15.0132C11.6978 18.3289 6.30222 18.3289 2.98662 15.0132L2.98662 15.0132C-0.328872 11.6978 -0.328872 6.30222 2.98662 2.98677L2.98663 2.98676C6.30209 -0.328916 11.6978 -0.328926 15.0134 2.98677ZM14.1549 13.2782L14.5725 13.6958L14.9155 13.215C16.7082 10.7019 16.7082 7.29813 14.9155 4.78477L14.5725 4.3039L14.1549 4.72157L12.3171 6.55943L12.0478 6.82877L12.2359 7.15995C12.8819 8.29697 12.8819 9.70279 12.2359 10.8401L12.0478 11.1713L12.3171 11.4406L14.1549 13.2782ZM7.24136 7.24136L7.24132 7.24139C6.27147 8.2114 6.27147 9.78863 7.24148 10.7586C8.21149 11.7286 9.78862 11.7286 10.7586 10.7586L10.7587 10.7586C11.7285 9.78866 11.7287 8.21145 10.7587 7.24139C9.78875 6.27133 8.21138 6.27138 7.24136 7.24136ZM13.2785 3.84513L13.6961 3.4275L13.2153 3.08454C10.7019 1.29177 7.29824 1.29176 4.78497 3.08454L4.30417 3.42751L4.72177 3.84513L6.55952 5.68302L6.82885 5.95238L7.16005 5.76423C8.29737 5.11816 9.70304 5.11817 10.8402 5.76422L11.1714 5.95239L11.4407 5.68302L13.2785 3.84513ZM3.84513 4.72156L3.42748 4.30392L3.08451 4.78477C1.29183 7.29814 1.29183 10.7019 3.08451 13.2152L3.42747 13.6961L3.84511 13.2785L5.68312 11.4406L5.95248 11.1713L5.76432 10.84C5.11825 9.70278 5.11825 8.2972 5.76421 7.15992L5.95232 6.82874L5.683 6.55942L3.84513 4.72156ZM4.72152 14.1549L4.30391 14.5725L4.78473 14.9155C7.29812 16.7082 10.7019 16.7082 13.2153 14.9155L13.6961 14.5725L13.2785 14.1549L11.4406 12.317L11.1713 12.0477L10.8401 12.2357C9.70294 12.8816 8.29724 12.8816 7.16006 12.2355L6.82886 12.0474L6.55952 12.3167L4.72152 14.1549Z"
          fill={color}
          stroke={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_5_8726">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  FallDetection: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7286 12.75L10.5996 1.3719C10.2605 0.830747 9.65385 0.5 8.99998 0.5C8.34591 0.5 7.7393 0.830747 7.40034 1.3719L0.271366 12.75C-0.0791276 13.3094 -0.0909131 14.0078 0.240734 14.5777C0.572254 15.1473 1.19534 15.5 1.87078 15.5H16.1292C16.8046 15.5 17.4277 15.1473 17.7594 14.5777C18.0909 14.0078 18.0791 13.3094 17.7286 12.75ZM7.79473 4.70533C7.79473 4.06093 8.33425 3.53885 8.99998 3.53885C9.66564 3.53885 10.2051 4.06093 10.2051 4.70533V8.99195C10.2051 9.63623 9.66564 10.1584 8.99998 10.1584C8.33425 10.1584 7.79473 9.63623 7.79473 8.99195V4.70533ZM8.99998 13.8195C8.25101 13.8195 7.64405 13.232 7.64405 12.5071C7.64405 11.7823 8.25101 11.1946 8.99998 11.1946C9.74872 11.1946 10.3557 11.7823 10.3557 12.5071C10.3557 13.232 9.74872 13.8195 8.99998 13.8195Z"
        fill={color}
      />
    </svg>
  ),
  HealthInfo: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2621 2.30154C15.1399 1.15872 13.6477 0.529411 12.0607 0.529411C10.9634 0.529411 9.91859 0.825197 9.00008 1.39059C8.08157 0.825197 7.03729 0.529411 5.93945 0.529411C4.35245 0.529411 2.86021 1.15872 1.73756 2.30167C-0.579186 4.66089 -0.579186 8.49963 1.73756 10.8589L7.68668 16.9169C8.03766 17.2739 8.50397 17.4706 9.00008 17.4706C9.49617 17.4706 9.96248 17.2739 10.314 16.9165L16.2626 10.8589C18.5793 8.49963 18.5791 4.66076 16.2621 2.30154ZM14.8423 9.41298L9.00008 15.3623L3.20054 9.4564H3.70803C4.0682 9.4564 4.40106 9.25991 4.57965 8.94126L5.3424 7.58214L6.57346 11.6561C6.68755 12.0334 7.00454 12.3103 7.38851 12.3672C7.4369 12.3745 7.48526 12.3779 7.53339 12.3779C7.86575 12.3779 8.18079 12.2096 8.3688 11.9226L9.98334 9.4564H11.7172C12.2718 9.4564 12.7213 8.99873 12.7213 8.43396C12.7213 7.86918 12.2718 7.41151 11.7172 7.41151H9.44582C9.11022 7.41151 8.79668 7.58237 8.6104 7.8668L7.87098 8.99633L6.58039 4.7248C6.46256 4.3353 6.12896 4.05406 5.7311 4.00936C5.33273 3.96363 4.94726 4.16432 4.74858 4.51832L3.12513 7.41151H2.09499C1.82984 6.12978 2.18254 4.74096 3.15761 3.74769C3.90102 2.99108 4.88871 2.57443 5.93945 2.57443C6.83663 2.57443 7.67924 2.87185 8.37624 3.4346L9.00008 3.93813L9.6239 3.4346C10.3209 2.87185 11.1638 2.57443 12.0607 2.57443C13.1114 2.57443 14.0992 2.99108 14.8423 3.74769C16.3762 5.30951 16.3762 7.851 14.8423 9.41298Z"
        fill={color}
      />
    </svg>
  ),
  Notice: ({ color = '#ffffff' }: IconProps) => (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0334 0H14.1618V0.592454C14.1618 1.18046 13.6877 1.6572 13.103 1.6572C12.5182 1.6572 12.0443 1.18046 12.0443 0.592454V0H9.5587V0.592454C9.5587 1.18046 9.08485 1.6572 8.50011 1.6572C7.9154 1.6572 7.4413 1.18046 7.4413 0.592454V0H4.95568V0.592454C4.95568 1.18046 4.48181 1.6572 3.89697 1.6572C3.31226 1.6572 2.83838 1.18046 2.83838 0.592454V0H0.96659C0.432915 0 0 0.435203 0 0.97221V17.0278C0 17.5647 0.432915 18 0.96659 18H16.0334C16.5671 18 17 17.5647 17 17.0278V0.97221C17 0.435203 16.5671 0 16.0334 0ZM15.0667 16.0554H1.93331V4.06425H15.0667V16.0554Z"
        fill={color}
      />
      <path
        d="M5.04788 7.58352H11.9524C12.3845 7.58352 12.7348 7.23117 12.7348 6.79635C12.7348 6.36178 12.3845 6.00943 11.9524 6.00943H5.04788C4.61583 6.00943 4.26514 6.36178 4.26514 6.79635C4.26514 7.23117 4.61583 7.58352 5.04788 7.58352Z"
        fill={color}
      />
      <path
        d="M5.04788 10.6855H11.9524C12.3845 10.6855 12.7348 10.333 12.7348 9.89829C12.7348 9.46372 12.3845 9.11137 11.9524 9.11137H5.04788C4.61583 9.11137 4.26514 9.46372 4.26514 9.89829C4.26514 10.333 4.61583 10.6855 5.04788 10.6855Z"
        fill={color}
      />
      <path
        d="M5.04788 13.7873H11.9524C12.3845 13.7873 12.7348 13.4349 12.7348 13.0002C12.7348 12.5657 12.3845 12.2132 11.9524 12.2132H5.04788C4.61583 12.2132 4.26514 12.5657 4.26514 13.0002C4.26514 13.4349 4.61583 13.7873 5.04788 13.7873Z"
        fill={color}
      />
    </svg>
  ),
}

export const Arrow = ({ color = '#A3A3A3', rotate = false }) => {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rotate ? 'rotate-180' : ''}
    >
      <path
        d="M2.75656 6.99994L7.70656 11.9499C7.80207 12.0422 7.87825 12.1525 7.93066 12.2745C7.98307 12.3965 8.01066 12.5278 8.01181 12.6605C8.01296 12.7933 7.98766 12.925 7.93738 13.0479C7.8871 13.1708 7.81285 13.2824 7.71896 13.3763C7.62506 13.4702 7.51341 13.5445 7.39051 13.5948C7.26762 13.645 7.13594 13.6703 7.00316 13.6692C6.87038 13.668 6.73916 13.6404 6.61716 13.588C6.49515 13.5356 6.38481 13.4594 6.29256 13.3639L0.63556 7.70694C0.448089 7.51941 0.342773 7.2651 0.342773 6.99994C0.342773 6.73477 0.448089 6.48046 0.63556 6.29294L6.29256 0.635936C6.48116 0.453778 6.73376 0.352984 6.99596 0.355262C7.25816 0.357541 7.50897 0.46271 7.69438 0.648118C7.87979 0.833526 7.98496 1.08434 7.98723 1.34654C7.98951 1.60873 7.88872 1.86133 7.70656 2.04994L2.75656 6.99994Z"
        fill={color}
      />
    </svg>
  )
}
