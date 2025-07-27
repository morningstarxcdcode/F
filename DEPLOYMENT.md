# Deployment Guide

## 🚀 Quick Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - Deploy!

### Netlify

1. **Build the project**
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy to Netlify**
   - Drag and drop the `out` folder to Netlify
   - Or connect your GitHub repository

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

Set these environment variables in your deployment platform:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 📋 Pre-deployment Checklist

- [ ] Update `NEXT_PUBLIC_API_URL` to your production backend
- [ ] Test all authentication flows
- [ ] Verify all API endpoints are working
- [ ] Test responsive design on different devices
- [ ] Check browser compatibility
- [ ] Optimize images and assets
- [ ] Set up error monitoring (optional)

## 🔒 Security Considerations

- JWT tokens are stored in secure HTTP-only cookies
- All API requests include proper authentication headers
- CORS is handled by the backend
- No sensitive data is exposed in the frontend code

## 📊 Performance Optimization

The frontend is already optimized with:
- Next.js automatic code splitting
- Image optimization
- CSS optimization with Tailwind
- Lazy loading of components
- Efficient state management

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check `NEXT_PUBLIC_API_URL` environment variable
   - Verify backend is running and accessible
   - Check CORS settings on backend

2. **Authentication Issues**
   - Verify JWT token format from backend
   - Check cookie settings
   - Ensure backend auth endpoints match expected format

3. **Build Issues**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors: `npm run type-check`
   - Verify all imports are correct

### Debug Mode

To enable debug mode during development:
```bash
DEBUG=* npm run dev
```

## 📈 Monitoring

Consider adding these monitoring tools:
- **Vercel Analytics** - Built-in analytics for Vercel deployments
- **Google Analytics** - User behavior tracking
- **Sentry** - Error monitoring and performance tracking
- **LogRocket** - Session replay and debugging

## 🔄 CI/CD Pipeline

Example GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build project
        run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🌐 Domain Setup

1. **Custom Domain**
   - Add your domain in Vercel/Netlify dashboard
   - Update DNS records as instructed
   - Enable HTTPS (automatic with Vercel/Netlify)

2. **SSL Certificate**
   - Automatic with Vercel/Netlify
   - For manual deployment, use Let's Encrypt

## 📱 Mobile App Considerations

If you plan to create a mobile app later:
- The API structure is already mobile-friendly
- Authentication system works with mobile apps
- Consider React Native for cross-platform development

---

Your ThelaConnect frontend is now ready for production deployment! 🎉
