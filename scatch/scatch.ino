double total_w_consumed = 0.f;
float battery_capacity = 220.0 * 12.8f;

bool simulation_active = true;
int simulation_w_consuming = 1 * 220;
double simulation_millisecond_coef = 0.00005f;

float old_time = 0;

char ping_text[] = "r";

void setup() {
  Serial.begin(19200);
  old_time = millis();
}

void loop() {
  if (Serial.available() > 1) {
    if (Serial.find(ping_text)) {
      Serial.println(total_w_consumed);
    }
  }
  if (simulation_active) {
    if (battery_capacity > total_w_consumed) {
      float delta_time = get_delta_time();
      total_w_consumed += simulation_w_consuming * (delta_time * simulation_millisecond_coef);
    } else {
      total_w_consumed = battery_capacity;
    }
  }
}

float get_delta_time() {
  float c_time = millis();
  float d_time = c_time - old_time;
  old_time = c_time;
  return d_time / 32;
}