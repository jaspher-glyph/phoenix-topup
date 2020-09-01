// MIN Prefixes per Telcom Brand
const Prefixes = {
  globe: [
    '977',
    '905',
    '906',
    '915',
    '916',
    '917',
    '926',
    '927',
    '936',
    '995',
    '997',
    '956',
    '945',
    '966',
    '975',
    '936',
    '905',
    '906',
    '916',
    '926',
    '935',
    '997',
    '955',
    '945',
    '965',
  ],
  tm: ['975', '936', '905', '906', '916', '926', '935', '997', '955', '945', '965'],
  smart: [
    '907',
    '908',
    '909',
    '910',
    '912',
    '918',
    '919',
    '920',
    '921',
    '928',
    '929',
    '930',
    '938',
    '939',
    '946',
    '947',
    '948',
    '949',
    '998',
    '999',
    '950',
    '958',
  ],
  talkntext: [
    '907',
    '908',
    '909',
    '910',
    '912',
    '918',
    '919',
    '920',
    '921',
    '928',
    '929',
    '930',
    '938',
    '939',
    '946',
    '947',
    '948',
    '949',
    '998',
    '999',
    '950',
  ],
  pldtload: ['919', '920', '921', '958'],
  sun: ['922', '923', '932', '933', '942', '943', '925'],
}

const postpaidMid = {
  // GLOBE POSTPAIDS
  917: [
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '30',
    '31',
    '32',
    '62',
    '63',
    '65',
    '67',
    '68',
    '70',
    '71',
    '72',
    '77',
    '79',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
  ],
  905: ['99'],
  906: ['99'],
  977: ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89'],

  // SMART POSTPAIDS
  908: ['81', '82', '83', '86', '87', '88', '89'],
  918: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  919: ['91', '99'],
  920: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  928: ['50', '51', '52', '55'],
  939: ['90', '91', '92', '93'],
  947: ['89', '99'],
  949: ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '53', '88', '99'],
  998: [
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '84',
    '85',
    '88',
    '95',
    '96',
    '97',
    '98',
    '99',
  ],
  999: ['25', '26', '27', '28', '29', '88', '99'],

  // SUN POSTPAIDS
  922: [
    '05',
    '06',
    '07',
    '08',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '91',
    '92',
    '99',
  ],
  923: ['02', '03', '04', '05', '06', '07', '08', '09', '70', '75', '76'],
  925: [
    '10',
    '11',
    '15',
    '20',
    '21',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '41',
    '42',
    '43',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80',
    '81',
    '82',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '90',
    '91',
    '92',
    '93',
    '94',
  ],
  932: ['84', '85', '86', '87', '88', '89'],
  933: ['83', '84', '88', '90'],
  943: ['04', '72', '73', '74', '75', '76', '77', '78', '79', '87', '90', '91'],
}

// TODO: Get number from from the 6th index and convert to number to compare range
const postpaidSuffix = {
  92220: [0, 989],
  92291: [30000, 39999],
  92292: [20000, 29999],
  92299: [90000, 99999],

  92308: [0, 2999],
  92309: [90000, 99999],

  92515: [0, 49999],
  92520: [710, 99999],

  93384: [0, 79999],

  94304: [1000, 2999],
  94372: [50370, 99999],
  94387: [82000, 87999],
  94390: [62000, 62999],
  94391: [5000, 5999],
}

const AssignedMinPrefixes = {
  smart: ['SMART E-LOAD', 'SMART BRO', 'DATA PACKAGE', 'SMART IDD', 'PREPAID CARD'],
  talkntext: ['TALK AND TEXT', 'TALKNTEXT', 'GAAN ALL-IN-ONE', 'LOAD UPSELL'],
  globe: ['GLOBE', 'AMAX', 'TIPIDD', 'GO UNLI', 'DATA PACKAGE', 'PREPAID CARD', 'OTHERS'],
  tm: ['TM', 'TOUCH MOBILE', 'AMAX', 'TIPIDD', 'DATA PACKAGE', 'PREPAID CARD', 'OTHERS'],
  sun: ['SUN'],
}

export const isMinValid = (min, category, isAccountBox) => {
  let obj = {
    isvalid: true,
    isPostpaid: false,
    isMeralco: !!category.toUpperCase().includes('MERALCO'),
  }

  if (category.toUpperCase().includes('MERALCO')) {
    let acceptedMeralcoPattern = /^[0-9]{12}/g
    if (!acceptedMeralcoPattern.test(min)) {
      obj.isvalid = false
    } else {
      obj.isvalid = true
      obj.isPostpaid = false
    }
  } else if (category.toUpperCase().includes('CIGNAL')) {
    if (isAccountBox) {
      let acceptedCignalPattern = /^[0-9]{7,11}/g
      if (!acceptedCignalPattern.test(min)) {
        obj.isvalid = false
      } else {
        obj.isvalid = true
        obj.isPostpaid = false
      }
    } else {
      let acceptedMinPattern = /^09[0-9]{9}/g
      if (!acceptedMinPattern.test(min)) {
        obj.isvalid = false
      }
    }
  } else {
    // Format Accepted (09XXXXXXXXX)
    let acceptedMinPattern = /^09[0-9]{9}/g
    if (!acceptedMinPattern.test(min)) {
      obj.isvalid = false
    }

    // Mobile initializations
    let prefix = min.substr(1, 3)
    let mid = min.substr(4, 2)
    let suffix = parseInt(min.substr(6, 5))
    let premid = prefix + mid

    let networks = Object.keys(AssignedMinPrefixes)

    let designatedNetwork = null

    // Check the category for the mean time
    if (!!category && networks.indexOf(category.toLowerCase()) !== -1) {
      designatedNetwork = category.toLowerCase()
    }

    if (designatedNetwork && Prefixes[designatedNetwork].indexOf(prefix) === -1) {
      obj.isvalid = false
    } else {
      if (category.toLowerCase().includes('globe') || category.toLowerCase().includes('smart')) {
        if (postpaidMid[prefix] !== undefined) {
          if (postpaidMid[prefix].indexOf(mid) !== -1) {
            obj.isvalid = false
            obj.isPostpaid = true
          }
        }
      } else if (category.toLowerCase() === 'sun') {
        if (postpaidSuffix[premid] !== undefined) {
          if (suffix >= postpaidSuffix[premid][0] && suffix <= postpaidSuffix[premid][1]) {
            obj.isvalid = false
            obj.isPostpaid = true
          }
        }
      }
    }
  }

  return obj
}
