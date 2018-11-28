// Blueprint
// There's a map at the bottom of the file which adds empty lists for
// all properites which expect it if not present
/*
{
    id: 'b1',
    name:           'Charge Worx UK Ltd',
    tradingName:    'Charge Worx',
    companyNumber:  '36534564658',
    vatNumber:      'GB220430231',
    companyType:    'Public limited company',
    sicCode:            '47110 - Retail sale in non-specialised stores with food, beverages or tobacco predominating',
    primaryAuthority:   'Shropshire County Council',
    additionalInfo:     'Charge Wrox UK, is a British subsiduary of and American company with headquarters in Welwyn Garden City, Hertfordshire, England, United Kingdom.',
    address:            '48 Bush Road,  Welwyn Garden City, Hertfordshire, England, United Kingdom  WG1 1XQ',
    posterImage:        '/public/images/ChargeWox_Logo.png',
    contact:        'Paul Jones, 0207 1234 5678, paul.jones@abc.np',
    products:   ['p1', 'p2'],
    attachments: ['a1'],
    contacts: [
        {
            id: 'c1',
            role: 'Primary contact'
        }
    ],
    locations: [
        {
            id: 'l1',
            role: 'Registered address'
        }
    ]
}
*/
module.exports = {
    businesses: [
        {
            id: 'b1',
            name: 'Charge Worx UK Ltd',
            tradingName: 'Charge Worx',

            companyNumber: '36534564658',
            vatNumber: 'GB220430231',
            companyType: 'Public limited company',

            sicCode: '47110 - Retail sale in non-specialised stores with food, beverages or tobacco predominating',
            primaryAuthority: 'Shropshire County Council',
            additionalInfo: 'Charge Wrox UK, is a British subsiduary of and American company with headquarters in Welwyn Garden City, Hertfordshire, England, United Kingdom.',

            address: '48 Bush Road,  Welwyn Garden City, Hertfordshire, England, United Kingdom  WG1 1XQ',

            posterImage: '/public/images/ChargeWox_Logo.png',

            contact: 'Paul Jones, 0207 1234 5678, paul.jones@abc.np',

            products: ['p1', 'p2'],
            attachments: ['at1'],

            contacts: [
                {
                    id: 'c1',
                    role: 'Primary contact'
                }
            ],

            locations: [
                {
                    id: 'l1',
                    role: 'Registered address'
                },
                {
                    id: 'l2',
                    role: 'Another address'
                }
            ]

        },


        {
            id: 'b2',
            name: 'Wonderlite Ltd.',
            tradingName: 'Wonderlite',
            companyNumber: '0135465432',
            address: '48 Bush Road, London N1 1XQ',
            contact: 'Paul Jones, 0207 1234 5678, paul.jones@abc.np',
            primaryAuthority: 'Suffolk Trading Standards'
        },
        {
            id: 'b3',
            name: 'Red Zulu Ltd',
            tradingName: 'Red Zulu',
            companyNumber: '00445790',
            address: '48 Bush Road, London N1 1XQ',
            posterImage: '/public/images/redzulu.gif',

            contact: 'Paul Jones, 0207 1234 5678, paul.jones@abc.np',
            primaryAuthority: 'Shropshire County Council'
        }
    ].map(business => {
        const requiredListProperties = [
            'products',
            'attachments',
            'contacts',
            'locations',
        ]
        requiredListProperties.forEach(property => {
            if (business[property] === undefined) {
                business[property] = []
            }
        })
        return business
    })
};