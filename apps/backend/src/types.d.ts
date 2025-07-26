// Type declarations for modules that might not have proper type definitions
declare module 'passport-google-oauth20' {
  import { Strategy as PassportStrategy } from 'passport';
  export class Strategy extends PassportStrategy {
    constructor(options: any, verify: any);
  }
}

declare module 'passport-github2' {
  import { Strategy as PassportStrategy } from 'passport';
  export class Strategy extends PassportStrategy {
    constructor(options: any, verify: any);
  }
}

declare module 'uuid' {
  export function v4(): string;
} 