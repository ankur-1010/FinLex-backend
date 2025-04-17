# FinLex-backend
1. Install dependencies

```bash
npm install
```

2. To run the app

```bash
npx ts-node-dev src/index.ts
```

# Notes:
### Best Practices:
1. **Development Environment**:
   - Use `synchronize: true` during development for quick iteration and testing.
   - Avoid running migrations in this case, as `synchronize` will handle schema updates automatically.

2. **Production Environment**:
   - Set `synchronize: false` in your `DataSource` configuration.
   - Use migrations exclusively to manage schema changes. This ensures that schema updates are explicit, predictable, and version-controlled.

### Recommended Configuration:
For production:

```typescript
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false, // Disable synchronize in production
  logging: false,
  entities: [FxTrade, EquityTrade],
  migrations: ['src/migrations/*.ts'], // Specify migration files
});
```

### Workflow for Production:
1. Generate a migration:
   ```bash
   npx typeorm migration:generate -n MigrationName
   ```
2. Run the migration:
   ```bash
   npx typeorm migration:run
   ```

### Summary:
- **Do not use `synchronize: true` and migrations together** in the same environment.
- Use `synchronize: true` for development only.
- Use migrations for production to ensure controlled and predictable schema updates.

