function (doc) {
	if (doc._id.substr(0,5) === "notes"){
		emit(doc.make, {
			"rev": 		doc._rev,
			"title": 	doc.title,
			"category": doc.category,
			"date": 	doc.date,
			"where": 	doc.where,
			"favorite": doc.favorite,
			"amount":   doc.amount,
			"notes": 	doc.notes
		});
	}
};