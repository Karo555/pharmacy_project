export const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const result = await db.execute(query, [id]);
    return result[0];
};
