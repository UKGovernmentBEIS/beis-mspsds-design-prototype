/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here


  'cases': [

  	{
      	type:   		'Case',
      	status: 		'Open',
      	id:     		'1811-0803',
      	title: 			'ChargeWorx adaptor, Electric shock, fire hazard',
		assignee:     	'Tim Harwood',
      	team:         	'Processing',
      	dateCreated:  	'18/10/2018',


      	hazard: 		{
      		type: 			'Electric shock, fire hazard',
      		details: 		'Travel adaptor available from high-street store Game has been reported to have caused a fire and severe electric shocks. Has been reported more than 10 times in the last 2 months.',
      		group: 			'Young children',
      		riskLevel: 		'Serious',
      		assessment: 	'assessment.pdf'
      	},

      	

      	products: 		['p1'],

      	businesses:  	['b1'],
      	
      	contacts: 		[],
      	attachments: 	[],
      	related: 		[],
      	activity: 		[]

    }

  ],


  'products': [

  	{
      	id:     		'p1',
      	name: 			'Travel plug adaptor — Charge Worx 931L',
      	posterImage: 	'/public/images/charge-worx.jpg',
      	brand: 			'Charge Worx',
      	modelName: 		'International Travel Adaptor',
      	modelNumber: 	'931L',
      	description: 	'Universal travel USB plug adaptor with surge protector',
      	type: 			'Travel adaptor',
      	category: 		'Electrical equipment',
      	barcode: 		'12345678911234',
      	productNumber: 	'123123131',
      	origin: 		'China',
      	manufacturer: 	'b1',
      	brand: 			'Charge Worx',
      	dateOnMarket: 	'10/10/2008',


      	businesses:  	[
      		{
      			business: 	'b1',
      			role: 		'Manufacturer'
      		},
      		{
      			business: 	'b1',
      			role: 		'Importer'
      		}
      	],

      	attachments: 	[],
      	related: 		[],
      	activity: 		[]

    },

    {
      	id:     		'p2',
      	name: 			'Another adaptor'

    }

  ],



  'businesses': [

  	{
  		id: 			'b1',
  		name: 			'ChargeWorx'
  	},

  	{
  		id: 			'b2'
  	}


  ]


}
