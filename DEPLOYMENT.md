# Vercel Deployment Guide for Secret Song Stash

This guide provides step-by-step instructions for deploying the Secret Song Stash application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository with the project code
- Environment variables configured

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project" on the dashboard
3. Import your GitHub repository: `josephmiles039/secret-song-stash`

### 2. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990

# Contract Configuration (Update with deployed addresses)
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
VITE_FHE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

### 3. Deployment Configuration

#### vercel.json (Optional)
Create a `vercel.json` file in the project root for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 4. Deploy the Application

1. Click "Deploy" in the Vercel dashboard
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your application will be available at the provided Vercel URL

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Enable SSL certificate (automatic)

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_CHAIN_ID` | Ethereum chain ID | `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint URL | `https://sepolia.infura.io/v3/...` |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `2ec9743d0d0cd7fb94dee1a7e6d33475` |
| `VITE_INFURA_API_KEY` | Infura API key | `b18fb7e6ca7045ac83c41157ab93f990` |
| `VITE_CONTRACT_ADDRESS` | Main contract address | `0x...` |
| `VITE_FHE_CONTRACT_ADDRESS` | FHE contract address | `0x...` |

## Build Configuration

### Package.json Scripts
Ensure these scripts are present in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Vite Configuration
The `vite.config.ts` should be configured for production builds:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
}));
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are properly installed
   - Verify environment variables are set correctly
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_` prefix
   - Redeploy after adding new environment variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure contract addresses are deployed and correct

4. **Asset Loading Issues**
   - Check that public assets are in the correct directory
   - Verify asset paths in the code
   - Check CORS settings if loading external resources

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics for performance monitoring

2. **Configure Caching**
   - Use the `vercel.json` configuration above
   - Set appropriate cache headers for static assets

3. **Image Optimization**
   - Use Vercel's Image Optimization API
   - Optimize images before uploading

## Monitoring and Maintenance

### Health Checks
- Monitor application uptime
- Check wallet connection functionality
- Verify smart contract interactions

### Updates
- Deploy updates by pushing to the main branch
- Test in preview deployments before production
- Monitor build logs for any issues

### Security
- Keep dependencies updated
- Monitor for security vulnerabilities
- Use environment variables for sensitive data

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs in the dashboard
3. Contact support through Vercel's help center

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)
