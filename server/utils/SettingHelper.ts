export const getCurrentSettingId = (): number => {
    const query = "SELECT id FROM current;";
    const result = await pool.query(query);
    return result.rows[0]['id'];
}