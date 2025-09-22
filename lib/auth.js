// lib/auth.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { Admin } from '@/lib/models/Admin';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const admin = await Admin.findOne({
          email: credentials.email.toLowerCase(),
          isActive: { $ne: false },
        }).select('+password');

        if (!admin) return null;

        const ok = await bcrypt.compare(credentials.password, admin.password);
        if (!ok) return null;

        // Return only safe fields; this becomes `user` in callbacks
        return {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name || 'Admin',
          role: admin.role || 'admin',
          phone: admin.phone || null,
          isActive: admin.isActive !== false,
        };
      },
    }),
  ],

  session: { strategy: 'jwt', maxAge: 24 * 60 * 60, updateAge: 60 * 60 },
  jwt: { maxAge: 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On sign-in, copy returned user fields to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.phone = user.phone;
        token.isActive = user.isActive;
      }
      // Optional: allow client to update name/phone via session.update
      if (trigger === 'update' && session) {
        token.name = session.name ?? token.name;
        token.phone = session.phone ?? token.phone;
      }
      return token;
    },

    async session({ session, token }) {
      // Mirror token onto session.user (the UI reads from session.user)
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.isActive = token.isActive;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  pages: { signIn: '/auth/signin', error: '/auth/error' },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// App Router route handler export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
