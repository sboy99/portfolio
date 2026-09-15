import { z } from "zod";

export const socialLinkSchema = z.object({
	label: z.string().min(1),
	href: z.url(),
});

export const skillGroupSchema = z.object({
	category: z.string().min(1),
	items: z.array(z.string().min(1)).min(1),
});

export const experienceSchema = z.object({
	company: z.string().min(1),
	role: z.string().min(1),
	startDate: z.iso.date(),
	endDate: z.iso.date().nullable(),
	summary: z.string().min(1),
	skills: z.array(z.string().min(1)).default([]),
});

export const educationSchema = z.object({
	school: z.string().min(1),
	program: z.string().min(1),
	startDate: z.iso.date(),
	endDate: z.iso.date().nullable(),
});

export const profileSchema = z.object({
	name: z.string().min(1),
	headline: z.string().min(1),
	bio: z.string().min(1),
	location: z.string().min(1),
	email: z.email(),
	socials: z.array(socialLinkSchema),
	skills: z.array(skillGroupSchema),
	experience: z.array(experienceSchema),
	education: z.array(educationSchema),
});

export type Profile = z.infer<typeof profileSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
