const path = require('path')
const yosay = require('yosay')
const to = require('to-case')
const Generator = require('yeoman-generator')

const serverGenerator = class extends Generator {
    prompting() {
        this.log(yosay('Lets start the journey...'))

        return this.prompt([{
            name: 'serverName',
            type: 'input',
            message: 'API name:',
            filter: answer => to.slug(answer),
            default: path.basename(this.destinationPath())
        }, {
            name: 'serverDescription',
            type: 'input',
            message: 'API description:'
        }, {
            name: 'serverVersion',
            type: 'input',
            message: 'API version:',
            default: '0.1.0'
        }, {
            name: 'authorName',
            type: 'input',
            message: 'Author name:',
            store: true
        }, {
            name: 'authorEmail',
            type: 'input',
            message: 'Author email:',
            store: true
        }]).then((answers) => {
            this.serverName = answers.serverName
            this.serverDescription = answers.serverDescription
            this.serverVersion = answers.serverVersion
            this.authorName = answers.authorName
            this.authorEmail = answers.authorEmail
        })
    }


    writing() {
        this.fs.copyTpl(
            this.templatePath('config.js'),
            this.destinationPath('config.js'), {
                serverName: this.serverName
            }
        )

        this.fs.copy(
            this.templatePath('index.js'),
            this.destinationPath('index.js')
        )

        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        )

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                serverName: this.serverName,
                serverDescription: this.serverDescription,
                serverVersion: this.serverVersion,
                authorName: this.authorName,
                authorEmail: this.authorEmail
            }
        )

        this.fs.copyTpl(
            this.templatePath('README.template.md'),
            this.destinationPath('README.md'), {
                serverName: this.serverName,
                serverDescription: this.serverDescription
            }
        )
    }

    install() {
        this.installDependencies({
            npm: true
        })
    }

}

module.exports = serverGenerator