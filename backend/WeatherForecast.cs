namespace backend
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; init; }

        public string? Summary { get; set; }
    }
}
