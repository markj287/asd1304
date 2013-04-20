function (doc) {
	if (doc._id.substr(0,6) === "notes:"){
		emit(doc._id.substr(6), {
			"title": doc.title,
			"date": doc.date,
			"where": doc.where,
			"notes": doc.notes
		});
	}
};