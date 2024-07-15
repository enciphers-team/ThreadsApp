const data = [
  {
    email: "benjamin.brian@mysecurecorp.com",
    password: "xUxZu4LaV",
    name: "Benjamin.brian",
    bio: "Enthusiastic developer with a passion for coding and innovation.",
    webLink: "https://mysecurecorp.com/benjamin.brian"
  },
  {
    email: "kenneth.jack@mysecurecorp.com",
    password: "&syyLq6wBt",
    name: "Kenneth.jack",
    bio: "Experienced engineer always looking for new challenges.",
    webLink: "https://mysecurecorp.com/kenneth.jack"
  },
  {
    email: "larry.justin@mysecurecorp.com",
    password: "3nALMRSJ=b",
    name: "Larry.justin",
    bio: "Tech enthusiast who loves to learn and explore new technologies.",
    webLink: "https://mysecurecorp.com/larry.justin"
  },
  {
    email: "michael.joseph@mysecurecorp.com",
    password: "?EtZdX9tRQ",
    name: "Michael.joseph",
    bio: "Dedicated professional with a keen eye for detail.",
    webLink: "https://mysecurecorp.com/michael.joseph"
  },
  {
    email: "jack.joshua@mysecurecorp.com",
    password: "UrW&bA5jMp",
    name: "Jack.joshua",
    bio: "Creative problem-solver with a background in software development.",
    webLink: "https://mysecurecorp.com/jack.joshua"
  },
  {
    email: "scott.brandon@mysecurecorp.com",
    password: "+jnSvEY2tz",
    name: "Scott.brandon",
    bio: "Committed team player who thrives in collaborative environments.",
    webLink: "https://mysecurecorp.com/scott.brandon"
  },
  {
    email: "ryan.dennis@mysecurecorp.com",
    password: "ss_4jTtDGB",
    name: "Ryan.dennis",
    bio: "Innovative thinker with a strong technical background.",
    webLink: "https://mysecurecorp.com/ryan.dennis"
  },
  {
    email: "justin.gregory@mysecurecorp.com",
    password: "kFDh3d@meF",
    name: "Justin.gregory",
    bio: "Results-driven individual with a focus on quality and efficiency.",
    webLink: "https://mysecurecorp.com/justin.gregory"
  },
  {
    email: "alexander.joshua@mysecurecorp.com",
    password: "HpRB@8yHuy",
    name: "Alexander.joshua",
    bio: "Motivated self-starter who excels in dynamic settings.",
    webLink: "https://mysecurecorp.com/alexander.joshua"
  },
  {
    email: "jack.joseph@mysecurecorp.com",
    password: "vDa4x/Lqyr",
    name: "Jack.joseph",
    bio: "Versatile programmer with a love for continuous learning.",
    webLink: "https://mysecurecorp.com/jack.joseph"
  },
  {
    email: 'jyearsley0@reference.com',
    password: 'R9B0cCRz90lo',
    name: 'Jojo',
    bio:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    webLink: 'https://www.facebook.com/',
  },
  {
    email: 'talgie1@msu.edu',
    password: 'BhqHAu',
    name: 'Town',
    bio:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'bszimon2@cdc.gov',
    password: 'igIbk2AHaX',
    name: 'Bobby',
    bio:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'oonion3@si.edu',
    password: 'ySWNyLFluk',
    name: 'Ortensia',
    bio:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    webLink: 'https://www.quora.com/',
  },
  {
    email: 'hfurphy4@amazonaws.com',
    password: 'EPD3wXkHQoi',
    name: 'Hanson',
    bio: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    webLink: 'https://www.cricbuzz.com/',
  },
  {
    email: 'pboliver5@alexa.com',
    password: 'b1aUMHqBC',
    name: 'Piper',
    bio:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    webLink: 'https://www.facebook.com/',
  },
  {
    email: 'megarr6@smh.com.au',
    password: '2OI6ru5FybdZ',
    name: 'Monique',
    bio:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    webLink: 'https://www.quora.com/',
  },
  {
    email: 'cgregore7@angelfire.com',
    password: 'sYY3j5gfqY',
    name: 'Con',
    bio:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'bblaes8@alexa.com',
    password: 'ldklqe',
    name: 'Barnaby',
    bio:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    webLink: 'https://www.cricbuzz.com/',
  },
  {
    email: 'sbricket9@cyberchimps.com',
    password: 'Aav1yy0qt',
    name: 'Sigfried',
    bio:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    webLink: 'https://www.facebook.com/',
  },
  {
    email: 'ahinckesa@tmall.com',
    password: 'xgAjfe6wifA',
    name: 'Ailsun',
    bio:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'cmccroryb@bbc.co.uk',
    password: 'tsD3fPMqa',
    name: 'Cleavland',
    bio:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    webLink: 'https://www.quora.com/',
  },
  {
    email: 'rspawellc@diigo.com',
    password: 'ZFmmeBn23aos',
    name: 'Rutger',
    bio:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'dbinningd@elegantthemes.com',
    password: '8sayDAcZul',
    name: 'Daphna',
    bio:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    webLink: 'https://www.facebook.com/',
  },
  {
    email: 'aterbruge@techcrunch.com',
    password: 'Qu3ZSoPbYvUM',
    name: 'Any',
    bio:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    webLink: 'https://www.cricbuzz.com/',
  },
  {
    email: 'cparfettf@wiley.com',
    password: '5uKMTJ',
    name: 'Carroll',
    bio:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'fmckellerg@networksolutions.com',
    password: 'MCQkaP',
    name: 'Frieda',
    bio:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    webLink: 'https://www.quora.com/',
  },
  {
    email: 'tberrygunh@ox.ac.uk',
    password: 'TJVmlNa3iv',
    name: 'Timoteo',
    bio:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'mbenedictoi@lulu.com',
    password: 'u6Mjr6OaD',
    name: 'Mitzi',
    bio:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    webLink: 'https://www.quora.com/',
  },
  {
    email: 'scrimj@ed.gov',
    password: 'sIqCiFSpVW',
    name: 'Sherri',
    bio:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    webLink: 'https://www.quora.com/',
  },
  {
    email: 'rmountaink@china.com.cn',
    password: 'MIprF0sSINSJ',
    name: 'Raul',
    bio:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'sculverhousel@icq.com',
    password: 'DpwCiheFMMHb',
    name: 'Sarge',
    bio:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    webLink: 'https://www.youtube.com/',
  },
  {
    email: 'kmcgloughlinm@wikia.com',
    password: 'jR6FBs84',
    name: 'Kaitlyn',
    bio: 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    webLink: 'https://www.facebook.com/',
  },
  {
    email: 'mdeanen@icio.us',
    password: 'A0R1BR6d',
    name: 'Meggy',
    bio:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    webLink: 'https://www.cricbuzz.com/',
  },
  {
    email: 'middinso@csmonitor.com',
    password: '2l7alH',
    name: 'Marilee',
    bio:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    webLink: 'https://www.cricbuzz.com/',
  },
];

module.exports = data;
