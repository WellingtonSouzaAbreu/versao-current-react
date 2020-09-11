
/* A interrogação é o category id de article passado como parâmetro para a função categoryWithChildren*/
//With recursive cria uma tabela temporária chamada subcategories
module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}

