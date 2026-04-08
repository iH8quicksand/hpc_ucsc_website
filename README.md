# Not-So-Slow-Slugs Club Website

A terminal-themed website for UCSC's High Performance Computing Club. Boot into our virtual cluster, browse file directories, and check out what we're competing in.

[Live on Vercel](https://hpc-ucsc-website.vercel.app/)


## About

I'm in UCSC's HPC club and we needed an actual website instead of a Google Sites page. Wanted something that felt like logging into a real cluster since that's what we actually do.

All the competition data and hardware inventory lives in JavaScript objects so future club leadership can update it without touching React.

## Stack

- React (hooks, no class components)
- Tailwind CSS
- Vite
- Lucide icons

## Implementation Notes

**Boot Sequence**  
Random delays between boot lines so it feels like actual server initialization. Once it finishes, you're "logged in" and can navigate the file system.

**Responsive**  
Desktop gets a sidebar, mobile gets horizontal pill navigation. Same state management, different layouts via Tailwind breakpoints.

## Running Locally

```bash
npm install
npm run dev
```

Builds with `npm run build` if you want to deploy your own fork.

## Future

- Could pull competition data from an API instead of static objects
- Admin panel for content updates would be nice
