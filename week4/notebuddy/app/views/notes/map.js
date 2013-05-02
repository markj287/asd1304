function (doc) {
	if (doc._id.substr(0,5) === "notes"){
		emit(doc.make, {
			"rev": 		doc._rev,
			"title": 	doc.title,
			"date": 	doc.date,
			"where": 	doc.where,
			"notes": 	doc.notes
		});
	}
};