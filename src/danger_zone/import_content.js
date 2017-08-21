/* eslint no-console: 0 */
/* global fetch */
import loremIpsum from 'lorem-ipsum';

import homepage1ScreenshotData from './binary_data/homepage1_screenshot';
import homepage2ScreenshotData from './binary_data/homepage2_screenshot';
import iphoneData from './binary_data/iphone';
import scrivitoLogoBWData from './binary_data/scrivito_logo_bw';
import scrivitoLogoDarkData from './binary_data/scrivito_logo_dark';
import scrivitoLogoWhiteData from './binary_data/scrivito_logo_white';
import unsplashAllesCandleWoodTableData from './binary_data/unsplash_alles_candle_wood_table';
import unsplashAppleWorkstationCalendarIpadData from './binary_data/unsplash_apple_workstation_calendar_ipad';
import unsplashAppleWorkstationWindcaveData from './binary_data/unsplash_apple_workstation_windcave';
import unsplashBikelaneData from './binary_data/unsplash_bikelane';
import unsplashBlackTablesWhiteChairsData from './binary_data/unsplash_black_tables_white_chairs';
import unsplashBuildingCornerCloudsData from './binary_data/unsplash_building_corner_clouds';
import unsplashBusinessPaperRedSocksData from './binary_data/unsplash_business_paper_red_socks';
import unsplashBusinessPaperWristwatchData from './binary_data/unsplash_business_paper_wristwatch';
import unsplashDeskRulerData from './binary_data/unsplash_desk_ruler';
import unsplashDimLaptopStandData from './binary_data/unsplash_dim_laptop_stand';
import unsplashFemaleBehindWindowData from './binary_data/unsplash_female_behind_window';
import unsplashFemalePortrait1Data from './binary_data/unsplash_female_portrait_1';
import unsplashFemalePortrait2Data from './binary_data/unsplash_female_portrait_2';
import unsplashFemalePortrait3Data from './binary_data/unsplash_female_portrait_3';
import unsplashFemalePortrait3SquareData from './binary_data/unsplash_female_portrait_3_square';
import unsplashFemalePortrait4Data from './binary_data/unsplash_female_portrait_4';
import unsplashFemalePortrait4SquareData from './binary_data/unsplash_female_portrait_4_square';
import unsplashFemalePortrait5Data from './binary_data/unsplash_female_portrait_5';
import unsplashFemalePortrait5SquareData from './binary_data/unsplash_female_portrait_5_square';
import unsplashHandcraftData from './binary_data/unsplash_handcraft';
import unsplashLadyInCoffeeShopData from './binary_data/unsplash_lady_in_coffee_shop';
import unsplashLaptopKeyboardData from './binary_data/unsplash_laptop_keyboard';
import unsplashMalePortrait1Data from './binary_data/unsplash_male_portrait_1';
import unsplashMalePortrait1SquareData from './binary_data/unsplash_male_portrait_1_square';
import unsplashMalePortrait2Data from './binary_data/unsplash_male_portrait_2';
import unsplashMalePortrait2SquareData from './binary_data/unsplash_male_portrait_2_square';
import unsplashMalePortrait3Data from './binary_data/unsplash_male_portrait_3';
import unsplashMalePortrait3SquareData from './binary_data/unsplash_male_portrait_3_square';
import unsplashMaleWithSunglassesData from './binary_data/unsplash_male_with_sunglasses';
import unsplashNeonTrueData from './binary_data/unsplash_neon_true';
import unsplashOfficeWindowData from './binary_data/unsplash_office_window';
import unsplashOfficeWithGlassData from './binary_data/unsplash_office_with_glass';
import unsplashOutdoorMeetingData from './binary_data/unsplash_outdoor_meeting';
import unsplashPlantData from './binary_data/unsplash_plant';
import unsplashScreenWithClockData from './binary_data/unsplash_screen_with_clock';
import unsplashTidyDeskTouchScreenData from './binary_data/unsplash_tidy_desk_touch_screen';
import unsplashWhiteMeetingRoomData from './binary_data/unsplash_white_meeting_room';

const Author = Scrivito.getClass('Author');
const Blog = Scrivito.getClass('Blog');
const BlogPost = Scrivito.getClass('BlogPost');
const Homepage = Scrivito.getClass('Homepage');
const Image = Scrivito.getClass('Image');
const Page = Scrivito.getClass('Page');

const BlogOverviewWidget = Scrivito.getClass('BlogOverviewWidget');
const ButtonWidget = Scrivito.getClass('ButtonWidget');
const ColumnWidget = Scrivito.getClass('ColumnWidget');
const FactWidget = Scrivito.getClass('FactWidget');
const GalleryImageWidget = Scrivito.getClass('GalleryImageWidget');
const GalleryWidget = Scrivito.getClass('GalleryWidget');
const HeadlineWidget = Scrivito.getClass('HeadlineWidget');
const IconListItemWidget = Scrivito.getClass('IconListItemWidget');
const IconListWidget = Scrivito.getClass('IconListWidget');
const IconWidget = Scrivito.getClass('IconWidget');
const ImageWidget = Scrivito.getClass('ImageWidget');
const PageListWidget = Scrivito.getClass('PageListWidget');
const PanelWidget = Scrivito.getClass('PanelWidget');
const PricingSpecWidget = Scrivito.getClass('PricingSpecWidget');
const PricingWidget = Scrivito.getClass('PricingWidget');
const SectionWidget = Scrivito.getClass('SectionWidget');
const TestimonialSliderWidget = Scrivito.getClass('TestimonialSliderWidget');
const TestimonialWidget = Scrivito.getClass('TestimonialWidget');
const TextWidget = Scrivito.getClass('TextWidget');

const UNSPLASH_TAGS = ['source: unsplash.com'];

function allExistingImages() {
  return Scrivito.load(() => {
    const allImages = [...Image.all()];
    return allImages.map(image => {
      return {
        id: image.id,
        filename: image.metadata().get('filename'),
      };
    });
  });
}

let existingImages;

function uploadImage({ url, filename }, title, tags = []) {
  const existingImage = existingImages.filter(i => i.filename === filename);
  if (existingImage.length) {
    console.log(`Skipping image "${title}" - already uploaded.`);
    return Image.get(existingImage[0].id);
  }

  const image = Image.create({ title, tags });

  fetch(url)
    .then(res => res.blob())
    .then(blob => Scrivito.Binary.upload(blob, { filename }))
    .then(binary => binary.into(image))
    .then(newBinary => image.update({ blob: newBinary }))
    .then(() => { console.log(`Upload of "${title}" done`); });

  return image;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function random(array) {
  const randomNumber = Math.floor(Math.random() * (array.length));
  return array[randomNumber];
}

function randomShuffle(array) {
  const shuffled = array.sort(() => { return 0.5 - Math.random(); });
  return shuffled.slice(0, Math.floor(Math.random() * ((array.length) + 1)));
}

// Returns a random date in the past ~5 months(9960000000)
function randomPastDate() {
  return new Date(+(new Date()) - (Math.floor(Math.random() * 9960000000)));
}

function createFeaturePanelWidget(icon, headline) {
  return new PanelWidget({
    body: [
      new IconWidget({
        icon,
        size: 'fa-4x',
        centered: 'yes',
      }),
      new HeadlineWidget({
        headline,
        level: 'h3',
        style: 'h3',
        centered: 'yes',
      }),
      new TextWidget({
        centered: 'yes',
        text: loremIpsum({
          units: 'paragraphs',
          format: 'html',
          count: 1,
          paragraphLowerBound: 2,
          paragraphUpperBound: 3,
        }),
      }),
    ],
  });
}

function importContent() {
  allExistingImages().then(images => {
    existingImages = images;

    // Logos
    const scrivitoLogoDark = uploadImage(scrivitoLogoDarkData, 'Scrivito Logo (Dark)');
    uploadImage(scrivitoLogoBWData, 'Scrivito Logo (Black & White)');
    const scrivitoLogoWhite = uploadImage(scrivitoLogoWhiteData, 'Scrivito Logo (White)');

    // Images
    const unsplashAllesCandleWoodTable = uploadImage(unsplashAllesCandleWoodTableData, 'Alles candle on wood table', UNSPLASH_TAGS);
    const unsplashAppleWorkstationCalendarIpad = uploadImage(unsplashAppleWorkstationCalendarIpadData, 'Apple workstation with calendar and Ipad', UNSPLASH_TAGS);
    const unsplashAppleWorkstationWindcave = uploadImage(unsplashAppleWorkstationWindcaveData, 'Apple workstation with Windcave image', UNSPLASH_TAGS);
    const unsplashBikelane = uploadImage(unsplashBikelaneData, 'Bikelane', UNSPLASH_TAGS);
    const unsplashBlackTablesWhiteChairs = uploadImage(unsplashBlackTablesWhiteChairsData, 'Black tables with white chairs', UNSPLASH_TAGS);
    const unsplashBuildingCornerClouds = uploadImage(unsplashBuildingCornerCloudsData, 'Building corner with clouds', UNSPLASH_TAGS);
    const unsplashBusinessPaperRedSocks = uploadImage(unsplashBusinessPaperRedSocksData, 'Business paper guy in red socks', UNSPLASH_TAGS);
    const unsplashBusinessPaperWristwatch = uploadImage(unsplashBusinessPaperWristwatchData, 'Ruler on a desk', UNSPLASH_TAGS);
    const unsplashDeskRuler = uploadImage(unsplashDeskRulerData, 'Ruler on a desk', UNSPLASH_TAGS);
    const unsplashDimLaptopStand = uploadImage(unsplashDimLaptopStandData, 'Dim laptop stand', UNSPLASH_TAGS);
    const unsplashFemaleBehindWindow = uploadImage(unsplashFemaleBehindWindowData, 'Female behind window', UNSPLASH_TAGS);
    const unsplashFemalePortrait1 = uploadImage(unsplashFemalePortrait1Data, 'Female Portrait 1', UNSPLASH_TAGS);
    const unsplashFemalePortrait2 = uploadImage(unsplashFemalePortrait2Data, 'Female Portrait 2', UNSPLASH_TAGS);
    uploadImage(unsplashFemalePortrait3Data, 'Female Portrait 3', UNSPLASH_TAGS);
    const unsplashFemalePortrait3Square = uploadImage(unsplashFemalePortrait3SquareData, 'Female Portrait 3 (Square)', [...UNSPLASH_TAGS, 'square']);
    uploadImage(unsplashFemalePortrait4Data, 'Female Portrait 4', UNSPLASH_TAGS);
    const unsplashFemalePortrait4Square = uploadImage(unsplashFemalePortrait4SquareData, 'Female Portrait 4 (Square)', [...UNSPLASH_TAGS, 'square']);
    uploadImage(unsplashFemalePortrait5Data, 'Female Portrait 5', UNSPLASH_TAGS);
    const unsplashFemalePortrait5Square = uploadImage(unsplashFemalePortrait5SquareData, 'Female Portrait 5 (Square)', [...UNSPLASH_TAGS, 'square']);
    const unsplashHandcraft = uploadImage(unsplashHandcraftData, 'Handcraft', UNSPLASH_TAGS);
    const unsplashLadyInCoffeeShop = uploadImage(unsplashLadyInCoffeeShopData, 'Lady in coffee shop', UNSPLASH_TAGS);
    const unsplashLaptopKeyboard = uploadImage(unsplashLaptopKeyboardData, 'Laptop keyboard', UNSPLASH_TAGS);
    const unsplashMalePortrait1 = uploadImage(unsplashMalePortrait1Data, 'Male Portrait 1', UNSPLASH_TAGS);
    const unsplashMalePortrait1Square = uploadImage(unsplashMalePortrait1SquareData, 'Male Portrait 1 (Square)', [...UNSPLASH_TAGS, 'square']);
    const unsplashMalePortrait2 = uploadImage(unsplashMalePortrait2Data, 'Male Portrait 2', UNSPLASH_TAGS);
    const unsplashMalePortrait2Square = uploadImage(unsplashMalePortrait2SquareData, 'Male Portrait 2 (Square)', [...UNSPLASH_TAGS, 'square']);
    uploadImage(unsplashMalePortrait3Data, 'Male Portrait 3', UNSPLASH_TAGS);
    const unsplashMalePortrait3Square = uploadImage(unsplashMalePortrait3SquareData, 'Male Portrait 3 (Square)', [...UNSPLASH_TAGS, 'square']);
    const unsplashMaleWithSunglasses = uploadImage(unsplashMaleWithSunglassesData, 'Male with glasses', UNSPLASH_TAGS);
    const unsplashNeonTrue = uploadImage(unsplashNeonTrueData, 'Neon true', UNSPLASH_TAGS);
    const unsplashOfficeWindow = uploadImage(unsplashOfficeWindowData, 'Office Window', UNSPLASH_TAGS);
    const unsplashOfficeWithGlass = uploadImage(unsplashOfficeWithGlassData, 'Glass office', UNSPLASH_TAGS);
    const unsplashOutdoorMeeting = uploadImage(unsplashOutdoorMeetingData, 'Outdoor meeting', UNSPLASH_TAGS);
    const unsplashPlant = uploadImage(unsplashPlantData, 'Plant on desk', UNSPLASH_TAGS);
    const unsplashScreenWithClock = uploadImage(unsplashScreenWithClockData, 'Screen with clock', UNSPLASH_TAGS);
    const unsplashTidyDeskTouchScreen = uploadImage(unsplashTidyDeskTouchScreenData, 'Tidy desk with touch screen', UNSPLASH_TAGS);
    const unsplashWhiteMeetingRoom = uploadImage(unsplashWhiteMeetingRoomData, 'White meeting room', UNSPLASH_TAGS);

    const homepage1Screenshot = uploadImage(
      homepage1ScreenshotData, 'Homepage variant 1 screenshot');
    const homepage2Screenshot = uploadImage(
      homepage2ScreenshotData, 'Homepage variant 2 screenshot');
    const iphone = uploadImage(iphoneData, 'iPhone screenshot');

    // Obj.root
    const root = Homepage.create({
      _path: '/',
      // Content is at the bottom of the file
    });

    // PRODUCT
    const product = Page.create({
      _path: '/product',
      title: 'Product',
      body: [
        new SectionWidget({
          backgroundColor: 'dark-image',
          backgroundImage: unsplashTidyDeskTouchScreen,
          content: [
            new ColumnWidget({
              nrOfColumns: '2',
              column1: [
                new HeadlineWidget({
                  level: 'h1',
                  style: 'h1',
                  headline: 'Amazing video hero widget',
                }),
                new TextWidget({
                  text: loremIpsum({
                    units: 'paragraphs',
                    format: 'html',
                    count: 1,
                    paragraphLowerBound: 3,
                    paragraphUpperBound: 5,
                  }),
                }),
                new ButtonWidget({
                  target: new Scrivito.Link({
                    title: 'Call to action',
                    obj: root,
                  }),
                }),
              ],
              column2: [new ImageWidget({ image: iphone })],
            }),
          ],
        }),
        new SectionWidget({ content: [
          new HeadlineWidget({
            level: 'h1',
            style: 'h2',
            showDividingLine: 'yes',
            headline: 'Great feature overview',
          }),
          new HeadlineWidget({
            level: 'h2',
            style: 'h4',
            centered: 'yes',
            headline: loremIpsum({ count: 2 }),
          }),
          new ColumnWidget({
            nrOfColumns: '3',
            column1: [
              createFeaturePanelWidget('fa-picture-o', 'Drag & drop widgets'),
            ],
            column2: [
              createFeaturePanelWidget('fa-mouse-pointer', 'WYSIWYG editing'),
            ],
            column3: [
              createFeaturePanelWidget('fa-cogs', 'Easy customization'),
            ],
          }),
          new ColumnWidget({
            nrOfColumns: '3',
            column1: [
              createFeaturePanelWidget('fa-comments-o', 'Full support'),
            ],
            column2: [
              createFeaturePanelWidget('fa-clone', 'Tons of widgets'),
            ],
            column3: [
              createFeaturePanelWidget('fa-mobile', 'Fully responsive'),
            ],
          }),
          new ButtonWidget({
            centered: 'yes',
            target: new Scrivito.Link({
              title: 'Call to action',
              obj: root,
            }),
          }),
        ] }),
        new SectionWidget({ content: [
          new HeadlineWidget({
            level: 'h1',
            style: 'h2',
            showDividingLine: 'yes',
            headline: 'Choose your plan',
          }),
          new HeadlineWidget({
            level: 'h2',
            style: 'h4',
            centered: 'yes',
            headline: loremIpsum({ count: 2 }),
          }),
          new PricingWidget({
            currency: '€',
            smallPlanName: 'Basic Plan',
            mediumPlanName: 'Team Plan',
            largePlanName: 'Corporate Plan',
            smallPlanPrice: '29',
            mediumPlanPrice: '59',
            largePlanPrice: '199',
            smallPlanPeriod: '/mo',
            mediumPlanPeriod: '/mo',
            largePlanPeriod: '/mo',
            smallPlanSpecs: [
              new PricingSpecWidget({ variable: '5', unit: 'projects' }),
              new PricingSpecWidget({ variable: '20', unit: 'images' }),
              new PricingSpecWidget({ variable: '9/5', unit: 'support' }),
            ],
            mediumPlanSpecs: [
              new PricingSpecWidget({ variable: '15', unit: 'projects' }),
              new PricingSpecWidget({ variable: '50', unit: 'images' }),
              new PricingSpecWidget({ variable: '12/7', unit: 'support' }),
            ],
            largePlanSpecs: [
              new PricingSpecWidget({ variable: 'unlimited', unit: 'projects' }),
              new PricingSpecWidget({ variable: 'unlimited', unit: 'images' }),
              new PricingSpecWidget({ variable: '24/7', unit: 'support' }),
            ],
            smallPlanButton: new Scrivito.Link({ title: 'Buy now', obj: root }),
            mediumPlanButton: new Scrivito.Link({ title: 'Buy now', obj: root }),
            largePlanButton: new Scrivito.Link({ title: 'Buy now', obj: root }),
          }),
        ] }),
      ],
    });

    // ABOUT
    const ourWork = Page.create({
      _path: '/about/our_work',
      title: 'Our Work',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Our Work' }),
        ] }),
      ],
    });
    const ourClients = Page.create({
      _path: '/about/our_clients',
      title: 'Our Clients',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Our Clients' }),
        ] }),
      ],
    });
    const about = Page.create({
      _path: '/about',
      _permalink: 'about',
      title: 'About',
      childOrder: [ourWork, ourClients],
      navigationStyle: 'transparentDark min-height',
      navigationBackgroundImage: unsplashDimLaptopStand,
      body: [
        new SectionWidget({
          content: [
            new HeadlineWidget({
              headline: 'Who we are',
              level: 'h1',
              style: 'h2',
            }),
            new HeadlineWidget({
              level: 'h2',
              style: 'h4',
              headline: loremIpsum({ count: 3 }),
            }),
            new TextWidget({
              text: loremIpsum({
                units: 'paragraphs',
                format: 'html',
                count: 4,
                paragraphLowerBound: 4,
                paragraphUpperBound: 10,
              }),
            }),
          ],
        }),
        new SectionWidget({
          backgroundColor: 'dark-image',
          backgroundImage: unsplashNeonTrue,
          content: [
            new ColumnWidget({
              nrOfColumns: '4',
              column1: [
                new FactWidget({
                  value: '134',
                  key: loremIpsum({ units: 'words', count: 3 }),
                }),
              ],
              column2: [
                new FactWidget({
                  value: '43',
                  key: loremIpsum({ units: 'words', count: 3 }),
                }),
              ],
              column3: [
                new FactWidget({
                  value: '13',
                  key: loremIpsum({ units: 'words', count: 3 }),
                }),
              ],
              column4: [
                new FactWidget({
                  value: '65',
                  key: loremIpsum({ units: 'words', count: 3 }),
                }),
              ],
            }),
          ],
        }),
        new SectionWidget({
          content: [
            new ColumnWidget({
              nrOfColumns: '3',
              column1: [
                new PanelWidget({
                  body: [
                    new ImageWidget({ image: unsplashFemalePortrait3Square }),
                    new HeadlineWidget({
                      headline: 'Jane Morgan',
                      level: 'h3',
                      style: 'h3',
                      centered: 'yes',
                    }),
                    new HeadlineWidget({
                      headline: 'Product Research Director',
                      level: 'h5',
                      style: 'h5',
                      showDividingLine: 'yes',
                      marginDisabled: 'yes',
                    }),
                  ],
                }),
              ],
              column2: [
                new PanelWidget({
                  body: [
                    new ImageWidget({ image: unsplashMalePortrait3Square }),
                    new HeadlineWidget({
                      headline: 'Peter Doe',
                      level: 'h3',
                      style: 'h3',
                      centered: 'yes',
                    }),
                    new HeadlineWidget({
                      headline: 'Internal Applications Supervisor',
                      level: 'h5',
                      style: 'h5',
                      showDividingLine: 'yes',
                      marginDisabled: 'yes',
                    }),
                  ],
                }),
              ],
              column3: [
                new PanelWidget({
                  body: [
                    new ImageWidget({ image: unsplashFemalePortrait4Square }),
                    new HeadlineWidget({
                      headline: 'Susan Summer',
                      level: 'h3',
                      style: 'h3',
                      centered: 'yes',
                    }),
                    new HeadlineWidget({
                      headline: 'Regional Agent',
                      level: 'h5',
                      style: 'h5',
                      showDividingLine: 'yes',
                      marginDisabled: 'yes',
                    }),
                  ],
                }),
              ],
            }),
            new ColumnWidget({
              nrOfColumns: '3',
              column1: [
                new PanelWidget({
                  body: [
                    new ImageWidget({ image: unsplashMalePortrait2Square }),
                    new HeadlineWidget({
                      headline: 'Clarius Ceasar',
                      level: 'h3',
                      style: 'h3',
                      centered: 'yes',
                    }),
                    new HeadlineWidget({
                      headline: 'Dynamic Operations Representative',
                      level: 'h5',
                      style: 'h5',
                      showDividingLine: 'yes',
                      marginDisabled: 'yes',
                    }),
                  ],
                }),
              ],
              column2: [
                new PanelWidget({
                  body: [
                    new ImageWidget({ image: unsplashFemalePortrait5Square }),
                    new HeadlineWidget({
                      headline: 'Anna Corn',
                      level: 'h3',
                      style: 'h3',
                      centered: 'yes',
                    }),
                    new HeadlineWidget({
                      headline: 'Regional Brand Producer',
                      level: 'h5',
                      style: 'h5',
                      showDividingLine: 'yes',
                      marginDisabled: 'yes',
                    }),
                  ],
                }),
              ],
              column3: [
                new PanelWidget({
                  body: [
                    new ImageWidget({ image: unsplashMalePortrait1Square }),
                    new HeadlineWidget({
                      headline: 'Jason John',
                      level: 'h3',
                      style: 'h3',
                      centered: 'yes',
                    }),
                    new HeadlineWidget({
                      headline: 'Dynamic Paradigm Director',
                      level: 'h5',
                      style: 'h5',
                      showDividingLine: 'yes',
                      marginDisabled: 'yes',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    // PRICING
    const pricing = Page.create({
      _path: '/pricing',
      title: 'Pricing',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Pricing' }),
        ] }),
      ],
    });

    // Authors for BlogPosts
    const janeDoe = Author.create({
      name: 'Jane Doe',
      description: loremIpsum({ units: 'sentences', count: 3 }),
      picture: unsplashFemaleBehindWindow,
    });

    const johnDoe = Author.create({
      name: 'John Doe',
      description: loremIpsum({ units: 'sentences', count: 3 }),
      picture: unsplashMaleWithSunglasses,
    });

    const authors = [janeDoe, johnDoe];

    const postImages = [
      unsplashAllesCandleWoodTable,
      unsplashAppleWorkstationCalendarIpad,
      unsplashAppleWorkstationWindcave,
      unsplashBikelane,
      unsplashBlackTablesWhiteChairs,
      unsplashBuildingCornerClouds,
      unsplashBusinessPaperRedSocks,
      unsplashBusinessPaperWristwatch,
      unsplashDeskRuler,
      unsplashLadyInCoffeeShop,
      unsplashLaptopKeyboard,
      unsplashOfficeWindow,
      unsplashOfficeWithGlass,
      unsplashOutdoorMeeting,
      unsplashPlant,
      unsplashScreenWithClock,
      unsplashWhiteMeetingRoom,
      null,
      null,
      null,
      null,
      null,
      null,
    ];

    const tags = ['Design', 'Development', 'Marketing', 'Business'];


    // BlogPosts
    for (let i = 0; i < 20; i += 1) {
      BlogPost.create({
        author: random(authors),
        title: capitalizeFirstLetter(loremIpsum({ units: 'words', count: 5 })),
        titleImage: random(postImages),
        subtitle: capitalizeFirstLetter(loremIpsum({ units: 'words', count: 7 })),
        tags: randomShuffle(tags),
        publishedAt: randomPastDate(),
        body: [
          new SectionWidget({
            content: [
              new TextWidget({
                text: loremIpsum({
                  units: 'paragraphs',
                  format: 'html',
                  count: 3,
                  paragraphLowerBound: 1,
                  paragraphUpperBound: 10,
                }),
              }),
              new ImageWidget({ image: random(postImages.filter(Boolean)) }),
              new TextWidget({
                text: loremIpsum({
                  units: 'paragraphs',
                  format: 'html',
                  count: 3,
                  paragraphLowerBound: 1,
                  paragraphUpperBound: 10,
                }),
              }),
            ],
          }),
        ],
      });
    }

    // BLOG
    const blog = Blog.create({
      _path: '/blog',
      _permalink: 'blog',
      title: 'Blog',
      navigationBackgroundImage: unsplashPlant,
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({
            level: 'h1',
            style: 'h2',
            showDividingLine: 'yes',
            headline: 'Latest news from our blog',
          }),
          new HeadlineWidget({
            level: 'h2',
            style: 'h4',
            centered: 'yes',
            headline: loremIpsum({ count: 2 }),
          }),
          new BlogOverviewWidget({}),
        ] }),
      ],
    });

    // WIDGETS AND PAGES
    const homeV1 = Page.create({
      _path: '/widgets_and_pages/home_v1',
      title: 'Homepage variant 1',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Homepage variant 1' }),
        ] }),
      ],
    });
    const homeV2 = Page.create({
      _path: '/widgets_and_pages/home_v2',
      title: 'Homepage variant 2',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Homepage variant 2' }),
        ] }),
      ],
    });
    const widgetsAndPages = Page.create({
      _path: '/widgets_and_pages',
      title: 'Widgets & Pages',
      childOrder: [homeV1, homeV2],
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Widgets & Pages' }),
        ] }),
      ],
    });

    // Path less Objs
    const jobs = Page.create({
      _permalink: 'jobs',
      title: 'Jobs',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Jobs' }),
        ] }),
      ],
    });
    const contact = Page.create({
      _permalink: 'contact',
      title: 'Contact',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Contact' }),
        ] }),
      ],
    });
    const imprint = Page.create({
      title: 'Imprint',
      _permalink: 'imprint',
      body: [
        new SectionWidget({
          content: [
            new HeadlineWidget({
              level: 'h1',
              style: 'h2',
              headline: 'Lorem ipsum dolor sit amet',
            }),
            new HeadlineWidget({
              level: 'h2',
              style: 'h4',
              headline: 'Lorem ipsum dolor sit ametLorem ipsum dolor sit amet',
            }),
            new TextWidget({
              text: loremIpsum({
                units: 'paragraphs',
                format: 'html',
                count: 9,
                paragraphLowerBound: 1,
                paragraphUpperBound: 10,
              }),
            }),
          ],
        }),
      ],
    });
    const login = Page.create({
      title: 'Login',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Login' }),
        ] }),
      ],
    });
    const events = Page.create({
      _permalink: 'events',
      title: 'Events & Conferences',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Events' }),
        ] }),
      ],
    });
    const landingPage = Page.create({
      _permalink: 'landing_page',
      title: 'Landing Page',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({ headline: 'Landing Page' }),
        ] }),
      ],
    });

    // icon buttons for Footer
    const twitterIcon = new IconListItemWidget({
      icon: 'fa-twitter',
      link: new Scrivito.Link({
        title: 'Twitter',
        target: '_blank',
        url: 'https://twitter.com/scrivito',
      }),
    });
    const facebookIcon = new IconListItemWidget({
      icon: 'fa-facebook-f',
      link: new Scrivito.Link({
        title: 'Facebook',
        target: '_blank',
        url: 'https://www.facebook.com/Scrivito/',
      }),
    });
    const xingIcon = new IconListItemWidget({
      icon: 'fa-xing',
      link: new Scrivito.Link({
        title: 'Xing',
        target: '_blank',
        url: 'https://www.xing.com/companies/infoparkag',
      }),
    });
    const linkedinIcon = new IconListItemWidget({
      icon: 'fa-linkedin',
      link: new Scrivito.Link({
        title: 'Linkedin',
        target: '_blank',
        url: 'https://www.linkedin.com/company/infopark',
      }),
    });

    // Obj.root
    root.update({
      childOrder: [product, about, pricing, blog, widgetsAndPages],
      logoDark: scrivitoLogoDark,
      logoWhite: scrivitoLogoWhite,
      navigationBackgroundImage: unsplashHandcraft,
      navigationStyle: 'transparentDark full-height',
      navigationSection: [
        new HeadlineWidget({
          centered: 'yes',
          headline: 'Amazing hero widget',
        }),
        new TextWidget({
          centered: 'yes',
          text: loremIpsum({
            units: 'paragraphs',
            format: 'html',
            count: 1,
            paragraphLowerBound: 3,
            paragraphUpperBound: 5,
          }),
        }),
        new ButtonWidget({
          centered: 'yes',
          target: new Scrivito.Link({
            title: 'Call to action',
            obj: root,
          }),
        }),
      ],
      footerIconList: [
        new IconListWidget({
          iconList: [twitterIcon, facebookIcon, xingIcon, linkedinIcon],
        }),
      ],
      title: 'Welcome to the Scrivito Example App JS!',
      body: [
        new SectionWidget({ content: [
          new HeadlineWidget({
            headline: 'Our top features',
            level: 'h1',
            style: 'h2',
            showDividingLine: 'yes',
          }),
          new ColumnWidget({
            nrOfColumns: '2',
            column1: [new ImageWidget({ image: unsplashLaptopKeyboard })],
            column2: [
              new HeadlineWidget({
                level: 'h3',
                style: 'h2',
                headline: 'Content Management for Professionals',
              }),
              new TextWidget({
                text: loremIpsum({
                  units: 'paragraphs',
                  format: 'html',
                  count: 1,
                  paragraphLowerBound: 3,
                  paragraphUpperBound: 5,
                }),
              }),
              new ButtonWidget({
                target: new Scrivito.Link({
                  title: 'Call to action',
                  obj: root,
                }),
              }),
            ],
          }),
          new ColumnWidget({
            nrOfColumns: '2',
            column1: [
              new HeadlineWidget({
                level: 'h3',
                style: 'h2',
                headline: 'Content Management for Professionals',
              }),
              new TextWidget({
                text: loremIpsum({
                  units: 'paragraphs',
                  format: 'html',
                  count: 1,
                  paragraphLowerBound: 3,
                  paragraphUpperBound: 5,
                }),
              }),
              new ButtonWidget({
                target: new Scrivito.Link({
                  title: 'Call to action',
                  obj: root,
                }),
              }),
            ],
            column2: [new ImageWidget({ image: unsplashDeskRuler })],
          }),
        ] }),
        new SectionWidget({ content: [
          new HeadlineWidget({
            headline: 'Different homepage variants',
            level: 'h1',
            style: 'h2',
            showDividingLine: 'yes',
          }),
          new ColumnWidget({
            nrOfColumns: '2',
            column1: [
              new ImageWidget({ image: homepage1Screenshot }),
              new HeadlineWidget({
                headline: 'Choose a different homepage variant',
                centered: 'yes',
                level: 'h3',
              }),
              new TextWidget({
                centered: 'yes',
                text: loremIpsum({
                  units: 'paragraphs',
                  format: 'html',
                  count: 1,
                  paragraphLowerBound: 3,
                  paragraphUpperBound: 5,
                }),
              }),
              new ButtonWidget({
                centered: 'yes',
                target: new Scrivito.Link({
                  title: 'Open Homepage variant 1',
                  obj: homeV1,
                }),
              }),
            ],
            column2: [
              new ImageWidget({ image: homepage2Screenshot }),
              new HeadlineWidget({
                headline: 'Choose a different homepage variant',
                centered: 'yes',
                level: 'h3',
              }),
              new TextWidget({
                centered: 'yes',
                text: loremIpsum({
                  units: 'paragraphs',
                  format: 'html',
                  count: 1,
                  paragraphLowerBound: 3,
                  paragraphUpperBound: 5,
                }),
              }),
              new ButtonWidget({
                centered: 'yes',
                target: new Scrivito.Link({
                  title: 'Open Homepage variant 2',
                  obj: homeV2,
                }),
              }),
            ],
          }),
        ] }),
        new SectionWidget({ content: [
          new HeadlineWidget({
            headline: 'Short collection of our awarded work',
            level: 'h1',
            style: 'h2',
            showDividingLine: 'yes',
          }),
          new TextWidget({
            centered: 'yes',
            text: loremIpsum({
              units: 'paragraphs',
              format: 'html',
              count: 1,
              paragraphLowerBound: 3,
              paragraphUpperBound: 5,
            }),
          }),
        ] }),
        new SectionWidget({
          useFullWidth: 'yes',
          paddingDisabled: 'yes',
          content: [
            new GalleryWidget({
              images: [
                new GalleryImageWidget({
                  title: 'Project 01',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashWhiteMeetingRoom,
                }),
                new GalleryImageWidget({
                  title: 'Project 02',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashHandcraft,
                }),
                new GalleryImageWidget({
                  title: 'Project 03',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashLaptopKeyboard,
                }),
                new GalleryImageWidget({
                  title: 'Project 04',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashDeskRuler,
                }),
                new GalleryImageWidget({
                  title: 'Project 05',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashOfficeWithGlass,
                }),
                new GalleryImageWidget({
                  title: 'Project 06',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashOfficeWindow,
                }),
                new GalleryImageWidget({
                  title: 'Project 07',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashOutdoorMeeting,
                }),
                new GalleryImageWidget({
                  title: 'Project 08',
                  subtitle: loremIpsum({ units: 'words', count: 5 }),
                  image: unsplashScreenWithClock,
                }),
              ],
            }),
          ],
        }),
        new SectionWidget({
          content: [
            new HeadlineWidget({
              level: 'h1',
              style: 'h2',
              showDividingLine: 'yes',
              headline: 'Our latest blog news',
            }),
            new BlogOverviewWidget({
              maxItems: 5,
            }),
            new ButtonWidget({
              centered: 'yes',
              target: new Scrivito.Link({
                title: 'Load all blog entries',
                obj: blog,
              }),
            }),
          ],
        }),
        new SectionWidget({
          content: [
            new HeadlineWidget({
              level: 'h1',
              style: 'h2',
              showDividingLine: 'yes',
              headline: 'What people are saying',
            }),
          ],
        }),
        new SectionWidget({
          backgroundColor: 'dark-image',
          backgroundImage: unsplashWhiteMeetingRoom,
          content: [
            new TestimonialSliderWidget({
              testimonials: [
                new TestimonialWidget({
                  testimonial: loremIpsum({ units: 'sentences', count: 2 }),
                  author: 'Alice Smith, CEO @ Acme',
                  authorImage: unsplashFemalePortrait1,
                }),
                new TestimonialWidget({
                  testimonial: loremIpsum({ units: 'sentences', count: 2 }),
                  author: 'Bob Johnson, CTO @ MegaCorp',
                  authorImage: unsplashMalePortrait1,
                }),
                new TestimonialWidget({
                  testimonial: loremIpsum({ units: 'sentences', count: 2 }),
                  author: 'Mary Williams, CTO @ The Company',
                  authorImage: unsplashFemalePortrait2,
                }),
                new TestimonialWidget({
                  testimonial: loremIpsum({ units: 'sentences', count: 2 }),
                  author: 'Robert Jones, CEO @ Next Big Thing',
                  authorImage: unsplashMalePortrait2,
                }),
              ],
            }),
          ],
        }),
      ],
    });

    // Footer
    const logoWidget = new ImageWidget({
      image: scrivitoLogoDark,
      cssClass: 'logo',
    });
    const address = new TextWidget({
      text: `<address>
        25, Lorem Lis Street, Orange <br>
        California, US<br>
        <br>
        <table>
          <tr><td>Phone: </td><td><a href="tel:+8001233567">800 123 3567</a></td></tr>
          <tr><td>Fax:   </td><td><a href="tel:+8004664422">800 466 4422</a></td></tr>
          <tr><td>Mail:  </td><td><a href="mailto:info@scrivito.com">info@scrivito.com</a></td></tr>
        </table>
      </address>
      `,
    });
    const footerLinks1 = new PageListWidget({
      headline: 'Homepages',
      pages: [root, homeV1, homeV2, landingPage],
    });
    const footerLinks2 = new PageListWidget({
      headline: 'About',
      pages: [jobs, contact, imprint, events, login],
    });
    const footerRow = new ColumnWidget({
      nrOfColumns: '3',
      column1: [logoWidget, address],
      column2: [footerLinks1],
      column3: [footerLinks2],
    });

    root.update({ footer: [footerRow] });

    console.log('Created all objs/widget. Now uploading images...');
  });
}

export default importContent;
