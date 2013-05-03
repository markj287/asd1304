function (doc) {
	if (doc._id.substr(0, 5) === "notes"){
		emit(doc.make, {
			"rev": doc._rev,
			"title": doc.title,
			"content": doc.content,
			"category": doc.category
		});
	}
};