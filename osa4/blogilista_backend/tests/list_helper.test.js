const listHelper = require('../utils/list_helper')



describe('dummy test', () => {
	test('dummy returns one', () => {
		const blogs = []
		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})

const listWithOneBLog = [{
	_id: '1251364345s452f',
	title: 'Ensimmainen blogi',
	author: 'Juhana',
	url: 'Ei ole',
	likes: 5,
	__v: 0
}]

const listWithManyLogs = [{
	_id: '1251364345s452f',
	title: 'Ensimmainen blogini',
	author: 'Juhana',
	url: 'Ei ole',
	likes: 5,
	__v: 0
}, {
	_id: '29g8g7839v938v7s83',
	title: 'Murmelin elämää',
	author: 'Juhana',
	url: 'Ei ole',
	likes: 14,
	__v: 0
}, {
	_id: '29g8g7839v938v7s83',
	title: 'Kuinka harjata hampaita',
	author: 'Kalle',
	url: 'Ei ole',
	likes: 5,
	__v: 0
}, {
	_id: '29g8g7839v938v7s83',
	title: 'Lumen kolaus ja kuinka tehdä siitä hauskaa',
	author: 'Kalle',
	url: 'Ei ole',
	likes: 9,
	__v: 0
}, {
	_id: '29g8g7839v938v7s83',
	title: 'Muppetti - kadonnut taika',
	author: 'Kalle',
	url: 'Ei ole',
	likes: 2,
	__v: 0
}]

describe('total likes', () => {
	test('of empty list is zero', () => {
		const blogs = []
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	})

	test('of one blog equals the likes of that blog', () => {
		const result = listHelper.totalLikes(listWithOneBLog)
		expect(result).toBe(listWithOneBLog[0].likes)
	})

	test('totalLikes returns 35', () => {
		const result = listHelper.totalLikes(listWithManyLogs)
		expect(result).toBe(35)
	})
})

describe('favorite blog', () => {
	test('Toinen blogi on suosikki', () => {
		const result = listHelper.favoriteBlog(listWithManyLogs)
		expect(result).toEqual(listWithManyLogs[1])
	})
})

// @todo Palaa tehtäviin 4.6 ja 4.7
// describe('person with the most blogs', () => {
// 	test('Kalle has the most blogs', () => {
// 		const result
// 	})
// })