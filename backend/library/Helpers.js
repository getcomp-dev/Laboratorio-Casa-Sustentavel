exports.paginate = async (model, query, page, per_page = 20) => {
    const countQuery = {... query};
    delete countQuery.include;

    per_page = per_page < 1 ? 20 : per_page;

    const total = await model.count(countQuery);
    const total_pages = Math.ceil(total/per_page);
    const current_page =  parseInt(page < 1 || page > total_pages ? 1 : page);

    return {
        current_page,
        per_page,
        total_pages,
        total,
        offset: (current_page-1)*per_page,
    }
};
