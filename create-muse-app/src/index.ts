#!/usr/bin/env node
import cac from 'cac'
import prompts from 'prompts'
import { downloadTemplate } from 'giget'
import pc from 'picocolors'
import fs from 'node:fs'
import path from 'node:path'
import { version } from '../package.json'

const cli = cac('create-muse-app')

cli
    .command('[project-name]', 'Create a new Muse application')
    .action(async (projectName) => {
        console.log(pc.cyan(`\n  Create Muse App  v${version}\n`))

        let result: prompts.Answers<'projectName' | 'template'>

        try {
            result = await prompts(
                [
                    {
                        type: projectName ? null : 'text',
                        name: 'projectName',
                        message: 'Project name:',
                        initial: 'my-muse-app',
                        onState: (state) => {
                            if (state.aborted) {
                                process.nextTick(() => process.exit(1))
                            }
                        },
                    },
                    {
                        type: 'select',
                        name: 'template',
                        message: 'Select a template:',
                        choices: [
                            { title: 'Next.js + Prisma (Full Stack)', value: 'next-prisma' },
                        ],
                        onState: (state) => {
                            if (state.aborted) {
                                process.nextTick(() => process.exit(1))
                            }
                        },
                    },
                ],
                {
                    onCancel: () => {
                        console.log(pc.red('✖') + ' Operation cancelled')
                        process.exit(1)
                    },
                }
            )
        } catch (cancelled) {
            process.exit(1)
        }

        const name = projectName || result.projectName
        const template = result.template
        const targetDir = path.resolve(process.cwd(), name)

        if (fs.existsSync(targetDir)) {
            const { overwrite } = await prompts({
                type: 'confirm',
                name: 'overwrite',
                message: `Directory ${name} already exists. Overwrite?`,
            })
            if (!overwrite) {
                process.exit(1)
            }
            // Simple clean up for demo - in prod be careful with rmSync
            fs.rmSync(targetDir, { recursive: true, force: true })
        }

        console.log(`\n${pc.green('Downloading template...')} ${pc.dim(`(${template})`)}`)

        try {
            // TODO: Replace 'gh:zhl/muse-templates' with your actual repository
            // Example: 'gh:username/repo/templates/basic'
            // For now we use a placeholder or local test
            const repo = `gh:Leochens/muse-builder-template/templates/${template}`

            // Note: Since we don't have the repo set up yet, this might fail if run immediately.
            // We are pointing to 'templates/basic' inside the repo.

            await downloadTemplate(repo, {
                dir: targetDir,
                force: true,
            })

            // Update package.json name
            const pkgPath = path.join(targetDir, 'package.json')
            if (fs.existsSync(pkgPath)) {
                const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
                pkg.name = name
                fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
            }

            console.log(`\n${pc.green('✔')} Success! Created ${name} at ${targetDir}\n`)
            console.log('Next steps:')
            console.log(`  cd ${name}`)
            console.log(`  npm install`)
            console.log(`  npm run dev\n`)
        } catch (err) {
            console.error(pc.red('\nFailed to download template:'))
            console.error(err)
            process.exit(1)
        }
    })

cli.help()
cli.version(version)
cli.parse()
