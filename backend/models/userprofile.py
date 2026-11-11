from pydantic import BaseModel, ConfigDict, Field


class FirstDayOfWeek(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    day_id: int = Field(alias="dayId")
    day_name: str = Field(alias="dayName")
    sort_order: int = Field(alias="sortOrder")
    is_possible_first_day: bool = Field(alias="isPossibleFirstDay")


class ProfileFormat(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    format_id: int = Field(alias="formatId")
    format_key: str = Field(alias="formatKey")
    min_fraction: int = Field(alias="minFraction")
    max_fraction: int = Field(alias="maxFraction")
    grouping_used: bool = Field(alias="groupingUsed")
    display_format: str | None = Field(alias="displayFormat")


class HydrationContainer(BaseModel):
    name: str | None
    volume: float
    unit: str


class UserProfile(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    display_name: str = Field(alias="displayName")
    preferred_locale: str = Field(alias="preferredLocale")
    measurement_system: str = Field(alias="measurementSystem")
    first_day_of_week: FirstDayOfWeek = Field(alias="firstDayOfWeek")
    number_format: str = Field(alias="numberFormat")
    time_format: ProfileFormat = Field(alias="timeFormat")
    date_format: ProfileFormat = Field(alias="dateFormat")
    power_format: ProfileFormat = Field(alias="powerFormat")
    heart_rate_format: ProfileFormat = Field(alias="heartRateFormat")
    time_zone: str = Field(alias="timeZone")
    hydration_measurement_unit: str = Field(alias="hydrationMeasurementUnit")
    hydration_containers: list[HydrationContainer] = Field(alias="hydrationContainers")
    golf_distance_unit: str = Field(alias="golfDistanceUnit")
    golf_elevation_unit: str | None = Field(alias="golfElevationUnit")
    golf_speed_unit: str | None = Field(alias="golfSpeedUnit")
    available_training_days: list[int] | None = Field(alias="availableTrainingDays")
    preferred_long_training_days: list[int] | None = Field(alias="preferredLongTrainingDays")