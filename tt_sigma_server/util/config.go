package util

import "github.com/spf13/viper"

// Config structure, must contain all the variables from app.env file
type Config struct {
	ServerAdress string `mapstructure:"SERVER_ADDRESS"`
}

// LoadConfig reads config into the Config structure from the app.env file and returns the config
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err = viper.ReadInConfig(); err != nil {
		return
	}

	err = viper.Unmarshal(&config)

	return
}
