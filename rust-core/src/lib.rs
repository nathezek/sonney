use wasm_bindgen::prelude::*;

// This allows us to use console.log from Rust
#[wasm_bindgen]
pub fn sonney_init() {
    web_sys::console::log_1(&"Sonney's Rust Reflexes are ONLINE! ☀️".into());
}

#[wasm_bindgen]
pub fn calculate_friction(scroll_speed: f64, idle_time: f64) -> f64 {
    // A simple math placeholder for your "proactive" logic
    (scroll_speed * 0.5) + (idle_time * 2.0)
}
