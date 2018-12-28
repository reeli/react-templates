import { Configuration, Entry, EntryFunc, Module, Options, Output, Plugin, Resolve, RuleSetRule } from "webpack";

export class WebpackBuilder {
  private webpackConfig: Configuration = {};

  static create() {
    return new WebpackBuilder();
  }

  mode(mode: "development" | "production" | "none") {
    this.webpackConfig.mode = mode;
    return this;
  }

  context(ctx: string) {
    this.webpackConfig.context = ctx;
    return this;
  }

  entry(opt: string | string[] | Entry | EntryFunc) {
    this.webpackConfig.entry = opt;
    return this;
  }

  output(opt: Output) {
    this.webpackConfig.output = opt;
    return this;
  }

  resolve(opt: Resolve) {
    this.webpackConfig.resolve = opt;
    return this;
  }

  addRule(rule: RuleSetRule) {
    const module = this.webpackConfig.module || ({} as Module);
    this.webpackConfig.module = {
      ...module,
      rules: ([] as RuleSetRule[]).concat(module.rules || []).concat(rule),
    };
    return this;
  }

  addPlugin(plugin: Plugin, enable: boolean = true) {
    const plugins: Plugin[] = this.webpackConfig.plugins || [];
    this.webpackConfig.plugins = [...plugins, ...(enable ? [plugin] : [])];
    return this;
  }

  optimization(opt: Options.Optimization) {
    this.webpackConfig.optimization = opt;
    return this;
  }

  extra<T>(key: string, extraConfig: T) {
    this.webpackConfig = {
      ...this.webpackConfig,
      [key]: extraConfig,
    } as Configuration;
    return this;
  }

  build() {
    return this.webpackConfig;
  }
}
