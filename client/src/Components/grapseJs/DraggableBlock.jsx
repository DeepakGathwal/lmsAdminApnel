// customBlocks.js
const customBlocks = [
  {
      id: 'section', // id is mandatory
      label: '<svg data-wf-icon="AddPanelSection64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13H53C54.1046 13 55 13.8954 55 15V49C55 50.1046 54.1046 51 53 51H11C9.89543 51 9 50.1046 9 49V15C9 13.8954 9.89543 13 11 13ZM8 15C8 13.3431 9.34315 12 11 12H53C54.6569 12 56 13.3431 56 15V49C56 50.6569 54.6569 52 53 52H11C9.34315 52 8 50.6569 8 49V15ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17ZM19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16Z" fill="white" fill-opacity="0.22"></path><rect x="8.5" y="19.5" width="47" height="15" rx="0.5" stroke="currentColor"></rect></svg> Section', // You can use HTML/SVG inside labels
      attributes: { class:'section' },
      content: `<section class="def-section"></section> <style>.def-section {display: block;min-height: 150px/*inlinestyles*/}</style>`,
      
  },
  {
      id: 'container', // id is mandatory
      label: '<svg data-wf-icon="AddPanelContainer64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13H53C54.1046 13 55 13.8954 55 15V49C55 50.1046 54.1046 51 53 51H11C9.89543 51 9 50.1046 9 49V15C9 13.8954 9.89543 13 11 13ZM8 15C8 13.3431 9.34315 12 11 12H53C54.6569 12 56 13.3431 56 15V49C56 50.6569 54.6569 52 53 52H11C9.34315 52 8 50.6569 8 49V15ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17ZM19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16Z" fill="white" fill-opacity="0.22"></path><rect x="17.5" y="19.5" width="29" height="29" rx="0.5" stroke="currentColor"></rect></svg> Container', // You can use HTML/SVG inside labels
      attributes: { class:'container' },
      content: `<div class="container"></div>
      <style>
      .container {margin: 0 auto;width: 100%;max-width: 1180px;padding: 0 15px;min-height: 50px}
      @media (max-width:1200px) {
        .container {margin: 0 auto;width: 100%;max-width: 1100px;padding: 0 15px;}
      }
      @media (max-width:1100px) {
        .container {margin: 0 auto;width: 100%;max-width: 1050px;padding: 0 15px;}
      }
      </style>`,
  },
  {
      id: 'Code',
      label: '<svg data-wf-icon="AddPanelCodeBlock64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15C12 13.3431 13.3431 12 15 12H49C50.6569 12 52 13.3431 52 15V49C52 50.6569 50.6569 52 49 52H15C13.3431 52 12 50.6569 12 49V15Z" fill="white" fill-opacity="0.1"></path><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M19 52L19 12L20 12L20 52H19Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 13H49C50.1046 13 51 13.8954 51 15V49C51 50.1046 50.1046 51 49 51H15C13.8954 51 13 50.1046 13 49V15C13 13.8954 13.8954 13 15 13ZM12 15C12 13.3431 13.3431 12 15 12H49C50.6569 12 52 13.3431 52 15V49C52 50.6569 50.6569 52 49 52H15C13.3431 52 12 50.6569 12 49V15ZM33 18H24V17H33V18ZM41 23H29V22H41V23ZM43 23H47V22H43V23ZM35 28V27H47V28H35ZM29 28H33V27H29V28ZM33 33H24V32H33V33Z" fill="currentColor"></path></svg>Code',
      content: `<div class="codebg"><h3>Example</h3>
        <style type="text/css">
          .codebg {
            background:#f6f6f6;
            border-radius: 10px;
            padding: 5px 20px;
          }
          pre.code {
              white-space: pre-wrap;
              display: flex;
              flex-direction: column;
              background: #454545;
              color: #fff;
              padding: 15px;
              font-size: 15px;
              font-weight: 400;
          }
          pre.code:before {
              font-family: monospace;
          }
          pre.code code {
              color: #fff;
          }
          pre.code code:before {
              width: 8em;         /* doesn't work */
              padding-left: auto; /* doesn't work */
              margin-left: auto;  /* doesn't work */
              text-align: right;  /* doesn't work */
          }
        </style>
        <pre class="code">
          <code class="javascript">
            const editor = grapesjs.init({
                container: '#gjs',
                components: '<div>Hello, World!</div>',
                style: '.text { color: red; }',
                plugins: ['gjs-preset-webpage'],
                pluginsOpts: {
                    'gjs-preset-webpage': { /* options */ }
                }
            });
          </code>
        </pre>
      </div>`,
    },
    {
      id: 'image',
      label: '<svg data-wf-icon="AddPanelImage64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 23C22 21.8954 22.8954 21 24 21H41C42.1046 21 43 21.8954 43 23V40C43 41.1046 42.1046 42 41 42H24C22.8954 42 22 41.1046 22 40V23ZM24 22C23.4477 22 23 22.4477 23 23V40C23 40.0896 23.0118 40.1764 23.0339 40.259L31.7929 31.5C32.1834 31.1095 32.8166 31.1095 33.2071 31.5L41.9661 40.259C41.9882 40.1764 42 40.0896 42 40V23C42 22.4477 41.5523 22 41 22H24ZM24 41C23.9104 41 23.8236 40.9882 23.741 40.9661L32.5 32.2071L41.259 40.9661C41.1764 40.9882 41.0896 41 41 41H24ZM28 28.5C28.8284 28.5 29.5 27.8284 29.5 27C29.5 26.1716 28.8284 25.5 28 25.5C27.1716 25.5 26.5 26.1716 26.5 27C26.5 27.8284 27.1716 28.5 28 28.5Z" fill="currentColor"></path></svg>Image',
      media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
      </svg>`,
      // Use `image` component
      content: { type: 'image' },
      // The component `image` is activatable (shows the Asset Manager).
      // We want to activate it once dropped in the canvas.
      activate: true,
      // select: true, // Default with `activate: true`
    },
    {
      id: 'text',
      label: '<svg data-wf-icon="AddPanelText64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.3799 27.2727V28.2102H23.1242V36H24.181V28.2102H26.9253V27.2727H20.3799ZM28.583 35.7187C29.0404 35.9971 29.5844 36.1363 30.2151 36.1363C30.6583 36.1363 31.0574 36.0682 31.4126 35.9318C31.7677 35.7926 32.066 35.5994 32.3074 35.3523C32.5489 35.1023 32.7208 34.8125 32.8231 34.4829L31.8515 34.2102C31.7662 34.4375 31.6455 34.6278 31.4893 34.7812C31.333 34.9318 31.1469 35.0454 30.931 35.1221C30.7179 35.196 30.4793 35.2329 30.2151 35.2329C29.8089 35.2329 29.4523 35.1449 29.1455 34.9687C28.8387 34.7897 28.5986 34.5298 28.4253 34.1889C28.2708 33.8772 28.1863 33.5036 28.1719 33.0682H32.9253V32.642C32.9253 32.0312 32.8444 31.517 32.6824 31.0994C32.5205 30.6818 32.3032 30.3466 32.0304 30.0937C31.7577 29.838 31.4552 29.6534 31.1228 29.5397C30.7904 29.4261 30.4537 29.3693 30.1128 29.3693C29.5219 29.3693 29.0049 29.5142 28.5617 29.804C28.1214 30.0909 27.7776 30.4915 27.5305 31.0057C27.2861 31.517 27.164 32.1079 27.164 32.7784C27.164 33.4488 27.2861 34.0369 27.5305 34.5426C27.7776 35.0454 28.1285 35.4375 28.583 35.7187ZM28.1744 32.1988C28.1936 31.8952 28.2701 31.6083 28.404 31.338C28.5603 31.0227 28.7833 30.767 29.0731 30.571C29.3657 30.3721 29.7123 30.2727 30.1128 30.2727C30.4765 30.2727 30.7918 30.3565 31.0589 30.5241C31.3287 30.6917 31.5361 30.9204 31.681 31.2102C31.8287 31.5 31.9026 31.8295 31.9026 32.1988H28.1744ZM35.0294 29.4545L36.5976 32.1307L38.1657 29.4545H39.3248L37.2112 32.7273L39.3248 36H38.1657L36.5976 33.4602L35.0294 36H33.8703L35.9498 32.7273L33.8703 29.4545H35.0294ZM43.6064 30.3068V29.4545H42.2087V27.8863H41.203V29.4545H40.2144V30.3068H41.203V34.3977C41.203 34.7784 41.2911 35.0937 41.4672 35.3437C41.6462 35.5937 41.8706 35.7798 42.1405 35.902C42.4133 36.0241 42.6917 36.0852 42.9758 36.0852C43.1633 36.0852 43.3181 36.071 43.4403 36.0426C43.5624 36.017 43.6576 35.9915 43.7258 35.9659L43.5212 35.0625L43.3508 35.0966C43.2797 35.1079 43.1888 35.1136 43.078 35.1136C42.9303 35.1136 42.7897 35.0909 42.6562 35.0454C42.5255 34.9971 42.4175 34.9034 42.3323 34.7642C42.2499 34.6221 42.2087 34.4091 42.2087 34.125V30.3068H43.6064Z" fill="currentColor"></path></svg>Text',
      content: `<div class="drop-text" data-gjs-type="text">Insert your text here</div>
      <style>
        .drop-text {font-family: Montserrat, sans-serif;color: rgb(26, 27, 31);font-size: 16px;line-height: 28px;font-weight: 400;}</style>`,
    },
    {
      id: 'vertical flex',
      label: '<svg data-wf-icon="AddPanelVFlexIcon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H47V47H17V17ZM16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17ZM32.8536 36.8536L36.8536 32.8536L36.1464 32.1464L33 35.2929V26H32V35.2929L28.8536 32.1464L28.1464 32.8536L32.1464 36.8536L32.5 37.2071L32.8536 36.8536Z" fill="currentColor"></path></svg>Vertical flex',
      content: `<div class="vertical-flex"></div>
      <style>
        .vertical-flex {display: flex;flex-direction: column;justify-content: flex-start;flex-wrap: nowrap;align-items: flex-start;width:auto;height:auto;min-height:30px}</style>`,
    },
    {
      id: 'Horizontal flex',
      label: '<svg data-wf-icon="AddPanelHFlexIcon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H47V47H17V17ZM16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17ZM37.8536 31.1464L33.8536 27.1464L33.1464 27.8536L36.2929 31H27V32H36.2929L33.1464 35.1464L33.8536 35.8536L37.8536 31.8536L38.2071 31.5L37.8536 31.1464Z" fill="currentColor"></path></svg>Horizontal flex',
      content: `<div class="Horizontal-flex"></div>
      <style>
        .Horizontal-flex {display: flex;flex-direction: row;justify-content: flex-start;flex-wrap: nowrap;align-items: flex-start;width:auto;height:auto;min-height:30px}</style>`,
    },
    {
      id: 'Div',
      label: '<svg data-wf-icon="AddPanelDiv64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M47 17H17V47H47V17ZM17 16C16.4477 16 16 16.4477 16 17V47C16 47.5523 16.4477 48 17 48H47C47.5523 48 48 47.5523 48 47V17C48 16.4477 47.5523 16 47 16H17Z" fill="currentColor"></path></svg>Div',
      content: `<div class="divider-def"></div>
      <style>
        .divider-def {display: block;width:auto;height:auto;min-height:50px;min-width:50px}</style>`,
    },
    {
      id: 'List',
      label: '<svg data-wf-icon="AddPanelList64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 19C12 18.4477 12.4477 18 13 18H51C51.5523 18 52 18.4477 52 19V45C52 45.5523 51.5523 46 51 46H13C12.4477 46 12 45.5523 12 45V19Z" fill="white" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13 19H51V45H13L13 19ZM12 19C12 18.4477 12.4477 18 13 18H51C51.5523 18 52 18.4477 52 19V45C52 45.5523 51.5523 46 51 46H13C12.4477 46 12 45.5523 12 45V19ZM19 24C19 24.5523 18.5523 25 18 25C17.4477 25 17 24.5523 17 24C17 23.4477 17.4477 23 18 23C18.5523 23 19 23.4477 19 24ZM19 33C19 33.5523 18.5523 34 18 34C17.4477 34 17 33.5523 17 33C17 32.4477 17.4477 32 18 32C18.5523 32 19 32.4477 19 33ZM22 24H46V32H22V24ZM47 33V32V24C47 23.4477 46.5523 23 46 23H22C21.4477 23 21 23.4477 21 24V32V33V40C21 40.5523 21.4477 41 22 41H46C46.5523 41 47 40.5523 47 40V33ZM22 40V33H46V40H22Z" fill="currentColor"></path></svg>List',
      content: `<ul class="uno-list">
          <li class="list"></li>
          <li class="list"></li>
          <li class="list"></li>
        </ul>
        <style>
          .uno-list{display: block;
            aspect-ratio: auto;
            list-style-type: disc;
            margin-top:1rem;
            margin-bottom:1rem;
            padding-left: 1.6rem;
          }
          .uno-list .list {
            width: auto;
            height: auto;
            min-height: 30px;
            min-width: 30px;
            margin-bottom: 10px;
          }
        </style>`,
    },
    {
      id: 'List-items',
      label: '<svg data-wf-icon="AddPanelListItem64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 19H51V45H13L13 19ZM12 19C12 18.4477 12.4477 18 13 18H51C51.5523 18 52 18.4477 52 19V45C52 45.5523 51.5523 46 51 46H13C12.4477 46 12 45.5523 12 45V19ZM46 24H22V40H46V24ZM22 23C21.4477 23 21 23.4477 21 24V40C21 40.5523 21.4477 41 22 41H46C46.5523 41 47 40.5523 47 40V24C47 23.4477 46.5523 23 46 23H22ZM19 33C19 33.5523 18.5523 34 18 34C17.4477 34 17 33.5523 17 33C17 32.4477 17.4477 32 18 32C18.5523 32 19 32.4477 19 33Z" fill="white" fill-opacity="0.22"></path><circle cx="18" cy="24" r="1" fill="currentColor"></circle><rect x="21.5" y="23.5" width="25" height="9" rx="0.5" fill="white" fill-opacity="0.1" stroke="currentColor"></rect></svg>List-items',
      content: `<li class="list"></li>`,
    },
    {
      id: 'Link-block',
      label: '<svg data-wf-icon="AddPanelLinkBlock64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H47V47H17V17ZM16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17ZM27.3536 33.3536L28.8536 31.8536L28.1464 31.1464L26.6464 32.6464C25.3466 33.9463 25.3466 36.0537 26.6464 37.3536C27.9463 38.6534 30.0537 38.6534 31.3536 37.3536L32.8536 35.8536L32.1464 35.1464L30.6464 36.6464C29.7371 37.5558 28.2629 37.5558 27.3536 36.6464C26.4442 35.7371 26.4442 34.2629 27.3536 33.3536ZM32.6464 26.6464C33.9463 25.3466 36.0537 25.3466 37.3536 26.6464C38.6534 27.9463 38.6534 30.0537 37.3536 31.3536L35.8536 32.8536L35.1464 32.1464L36.6464 30.6464C37.5558 29.7371 37.5558 28.2629 36.6464 27.3536C35.7371 26.4442 34.2629 26.4442 33.3536 27.3536L31.8536 28.8536L31.1464 28.1464L32.6464 26.6464ZM30.3536 34.3536L34.3536 30.3536L33.6464 29.6464L29.6464 33.6464L30.3536 34.3536Z" fill="currentColor"></path></svg>Link',
      content: `<div data-gjs-highlightable="true" id="ik8sh" data-gjs-type="text" draggable="true" class="menu-item gjs-selected link-block" contenteditable="false"><a id="ipep9d" data-gjs-type="link" draggable="true" href="" class="">WEB</a></div>
        <style>
        .link-block{
          position: static;
          display: block;
          margin-top: 0%;
          margin-left: 0%;
          flex-grow: 0;
          flex-shrink: 1;
          flex-basis: auto;
          height: auto;
          width: auto;
          min-height: 50px;
          min-width: 50px;
        }
        </style>`,
    },
    {
      id: 'Button',
      label: '<svg data-wf-icon="AddPanelButton64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 21C12.2386 21 10 23.2386 10 26V38C10 40.7614 12.2386 43 15 43H49C51.7614 43 54 40.7614 54 38V26C54 23.2386 51.7614 21 49 21H15ZM20 32H44V31H20V32Z" fill="currentColor"></path></svg>Button',
      content: `<div data-gjs-highlightable="true" id="ik8sh" data-gjs-type="text" draggable="true" class="menu-item gjs-selected gjs-button" contenteditable="false"><a id="ipep9d" data-gjs-type="link" draggable="true" href="" class="">WEB</a></div>
      <style>
        .gjs-button {
          display: inline-block;
          padding: 9px 15px;
          background-color: #3898EC;
          color: white;
          border: 0;
          line-height: inherit;
          text-decoration: none;
          cursor: pointer;
          border-radius: 0;
        }
      </style>`,
    },
    {
      id: 'Heading1',
      label: '<svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="white" fill-opacity="0.22"></path></svg>Heading 1',
      content: `<h1 class="gjs-heading1">Heading 1</h1>
      <style>
      .gjs-heading1 {
        margin-top: 0px;
        margin-bottom: 0px;
        color: rgb(138, 143, 160);
        font-size: 44px;
        line-height: 62px;
        font-weight: 400;
      }`
    },
    {
      id: 'Heading2',
      label: '<svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="white" fill-opacity="0.22"></path></svg>Heading 2',
      content: `<h2 class="gjs-heading2">Heading 2</h2>
      <style>
      .gjs-heading2 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 36px;
        line-height: 50px;
        font-weight: 400;
      }`
    },
    {
      id: 'Heading3',
      label: '<svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="white" fill-opacity="0.22"></path></svg>Heading 3',
      content: `<h3 class="gjs-heading3">Heading 3</h3>
      <style>
      .gjs-heading3 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 30px;
        line-height: 46px;
        font-weight: 400;
      }`
    },
    {
      id: 'Heading4',
      label: '<svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="white" fill-opacity="0.22"></path></svg>Heading 4',
      content: `<h3 class="gjs-heading4">Heading 4</h3>
      <style>
      .gjs-heading4 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 24px;
        line-height: 38px;
        font-weight: 400;
      }`
    },
    {
      id: 'Heading5',
      label: '<svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="white" fill-opacity="0.22"></path></svg>Heading 5',
      content: `<h3 class="gjs-heading5">Heading 5</h3>
      <style>
      .gjs-heading5 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 34px;
        font-weight: 500;
      }`
    },
    {
      id: 'Heading6',
      label: '<svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="white" fill-opacity="0.22"></path></svg>Heading 6',
      content: `<h3 class="gjs-heading6">Heading 6</h3>
      <style>
      .gjs-heading6 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 28px;
        font-weight: 500;
      }`
    },
    {
      id: 'paragraph',
      label: '<svg data-wf-icon="AddPanelParagraph64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52 27H12V26H52V27ZM52 33H12V32H52V33ZM12 39L32 39V38L12 38V39Z" fill="currentColor"></path></svg>paragraph',
      content: `<p class="gjs-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>`
    },
    {
      id: 'video',
      label: '<svg data-wf-icon="AddPanelVideoUrl64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M26.7773 23.4525C26.4451 23.2309 26 23.4691 26 23.8685V40.1315C26 40.5308 26.4451 40.769 26.7774 40.5475L38.9746 32.416C39.2714 32.2181 39.2714 31.7819 38.9746 31.5839L26.7773 23.4525ZM25 23.8685C25 22.6704 26.3352 21.9559 27.332 22.6204L39.5293 30.7519C40.4199 31.3456 40.4199 32.6543 39.5293 33.248L27.3321 41.3795C26.3352 42.0441 25 41.3295 25 40.1315V23.8685Z" fill="currentColor"></path></svg>Video',
      content: `<div id="iq5sru" data-gjs-type="video" draggable="true" allowfullscreen="allowfullscreen" class="gjs-selected"></div>`
    },
    {
      id: 'Quote',
      label: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"></path>
  </svg>Quote`,
      content: `<blockquote data-gjs-highlightable="true" id="ib6ngh" data-gjs-type="text" draggable="true" class="quote gjs-selected">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
    </blockquote>
    <style>
    .quote {
      color: #777;
      font-weight: 300;
      padding: 10px;
      box-shadow: -5px 0 0 0 #ccc;
      font-style: italic;
      margin: 20px 30px;
    }
    </style>`
    }
    
  // Add more custom blocks as needed
];


export default customBlocks;