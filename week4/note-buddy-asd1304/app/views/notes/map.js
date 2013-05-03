function (doc) {
	if (doc._id.substr(0, 5) === "notes"){
		emit(doc._id.substr(5), {
			"rev": doc._rev,
			"title": doc.title,
			"content": doc.content,
			"category": doc.category
		});
	}
};