/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },

    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      { value: 'release', name: 'release:  发布版本 | Release version' },
      {
        value: 'docs',
        name: 'docs:     文档更新 | Documentation only changes',
      },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code',
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature',
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance',
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests',
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies',
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts',
      },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files',
      },
    ],

    skipQuestions: ['breaking', 'footer', 'footerPrefix', 'scope'],
  },
}
