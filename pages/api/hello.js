/**
 * API Route: Default handler
 * 
 * Responds with a JSON object containing a default name.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export default (req, res) => {
    res.status(200).json({ name: 'John Doe'})
}