// Utils
const CustomError = require('../errors');



/**
 * Builds a query object based on query parameters and performs a MongoDB query.
 * The query object is built based on the query parameters and the following rules:
 * - Fields to exclude: select, sort, page, limit, filter, search, cursor
 * - Create operators ($gt, $gte, etc) for the query object
 * - Parse and transform the filter query parameter
 * - Validate filter format
 * - Check if filterQueryObj matches the expected format using a regex
 * - Replace operators with MongoDB syntax $gt ..
 * - Validates the query object
 * - Perform the query and return the results
 * @param {Object} req - Express request object
 * @param {Model} model - Mongoose model
 * @param {String[]} population - An array of strings representing the paths to populate
 * @returns {Promise<Object>} - A promise that resolves to an object with the following properties:
 *  - success: boolean - true if the query was successful, false otherwise
 *  - count: number - the number of documents returned
 *  - total: number - the total number of documents in the collection (only for offset pagination)
 *  - pages: number - the number of pages in the collection (only for offset pagination)
 *  - currentPage: number - the current page number (only for offset pagination)
 *  - nextCursor: string - the next cursor for cursor-based pagination (only for cursor-based pagination)
 *  - data: Array<Object> - an array of documents returned by the query
 */
const apiFeatures = async (req, model, population) => {
    let query ;
    let queryObj = {}
  
   
    // Add category to queryObj if it exists in req.query
    if (req.query.category) {
        const categories = req.query.category.split(',');
        queryObj = { category: { $in: categories } };

    }



    // search
    if (req.query.keyword) {
        queryObj.$text = { $search: req.query.keyword }
    }

    // Finding resource
    query = model.find(queryObj);

   

    if (!query) {
        throw new CustomError.NotFoundError("No data found")
    }
    // population
    if (population) {
        population.forEach(populate => {
            query = query.populate(...populate);
        })
    }

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    // else {
    //     query = query.select('-__v');
    // }

    // Sort
    if (req.query.sort) {
        const sortParams = req.query.sort.split(',');
        const sortBy = {};

        sortParams.forEach((param) => {
            const [field, order] = param.split(':');
            sortBy[field] = order === 'desc' ? -1 : 1
        });

        query = query.sort(sortBy);
    }

    // Pagination
    const limit = req.query.limit * 1 || 25;
    if (req.query.cursor) {
        let cursorQueryObk={}
        cursorQueryObk._id = { $gt: req.query.cursor }
        query = query.find(cursorQueryObk).limit(limit)


    } else {

        const page = req.query.page * 1 || 1;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }




    // Executing query
    let results
    // try {
        results = await query;

    // } catch {
    //     throw new CustomError.BadRequestError(`invalid query format or invalid value`);

    // }

    // get the total number of documents for offset pagination
    const total = !req.query.cursor ? await model.countDocuments(queryObj) : null;

    // prepare the next cursor for cursor-based pagination
    const nextCursor = results.length && req.query.cursor ? results[results.length - 1]._id : null;


    return {
        success: true,
        count: results.length,
        total, //only for offset pagination
        pages: !req.query.cursor ? (Math.ceil(total / limit) === 0 && results.length ? 1 : Math.ceil(total / limit)) : undefined, //only for offset pagination
        currentPage: !req.query.cursor ? req.query.page * 1 || 1 : undefined, //only for offset pagination
        nextCursor, //only for for cursor-based pagination
        data: results
    };
};

module.exports = apiFeatures;
